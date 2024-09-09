var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUI = require('swagger-ui-express');
var swaggerJsDoc = require('swagger-jsdoc');
var io = require("socket.io")();
var cors = require('cors');
const fileUpload = require('express-fileupload');
const cron = require('./cron/deleteProcedureNotarial')

// INICIAR AMBIENTES
const dotenv = require('dotenv');
dotenv.config();

// MONGO
const mongoose = require('mongoose');

// PASSPORT 
const passport = require('./helpers/Auth/passport');

mongoose.connect("mongodb://127.0.0.1:27017/tuexpertolegal?directConnection=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=> {
  console.log('Conectado a la base de datos');
}).catch((err) => {
  console.log('Error al conectar a la base de datos', err);
});

var indexRoutes = require('./routes/indexRoutes');
var authRoutes = require('./routes/authRoutes');
var pageRoutes = require('./routes/pageRoutes');
var notaryRoutes = require('./routes/notaryRoutes');
var categoryRoutes = require('./routes/categoryRoutes');
var userRoutes = require('./routes/userRoutes');
var actorRoutes = require('./routes/ActorRoutes');
var inputRoutes = require('./routes/inputRoutes');
var notarialActRoutes = require('./routes/notarialActRoutes');
var InternationalizationRoutes = require('./routes/InternationalizationRoutes');
var ContactRoutes = require('./routes/ContactRoutes');
var CategoryQuestionRoutes = require('./routes/categoryQuestionRoutes');
var SubcategoryQuestionRoutes = require('./routes/subcategoryQuestionRoutes');
var QuestionRoutes = require('./routes/QuestionRoutes');
var BannerRoutes = require('./routes/BannerRoutes');
var CommentRoutes = require('./routes/CommentRoutes');
var CallmeRoutes = require('./routes/CallmeRoutes');
var chatRoutes = require('./routes/chatRoutes');
var ProcedureNotarialRoutes = require('./routes/procedureNotarialRoutes');
var StorageRoutes = require('./routes/storageRoutes');
var NotificationRoutes = require('./routes/NotificationRoutes');
var ChatbotRoutes = require('./routes/ChatbotRoutes');
var AditionalConfigRoutes = require('./routes/AditionalConfigRoutes');
var NotificationRoutesNew = require('./routes/NotificationRoutesNew');

var app = express();
app.use(cors());
app.use(fileUpload());
cron.initScheduledJobs();

// SOCKET
app.io = io;
const Socket = require('./helpers/socket')
Socket.initialize(io);
Socket.init();




//API DOC
const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: 'Tu experto legal 1.0.0',
      description: 'Api Tu Experto Legal',
      concact: {
        name: 'Tu Experto Legal'
      }
    },
    securityDefinitions: {
      BearerAuth: {
        description: "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        type: "apiKey",
        name: "Authorization",
        in: "header",
        template: "Bearer {apiKey}"
      }
    },
  },
  apis: ['routes/*.js']
}

const swaggerDoc = swaggerJsDoc(swaggerOption);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/api', authRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/notary', notaryRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);
app.use('/api/actor', actorRoutes);
app.use('/api/input', inputRoutes);
app.use('/api/notarialact', notarialActRoutes);
app.use('/api/internationalization', InternationalizationRoutes);
app.use('/api/contact', ContactRoutes);
app.use('/api/categoryquestion', CategoryQuestionRoutes);
app.use('/api/subcategoryquestion', SubcategoryQuestionRoutes);
app.use('/api/question', QuestionRoutes);
app.use('/api/banner', BannerRoutes);
app.use('/api/comment', CommentRoutes);
app.use('/api/callme', CallmeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/procedurenotarial', ProcedureNotarialRoutes);
app.use('/api/storage', StorageRoutes);
app.use('/api/notification', NotificationRoutes)
app.use('/api/chatbot', ChatbotRoutes)
app.use('/api/aditional', AditionalConfigRoutes)
app.use('/api/notification-new', NotificationRoutesNew)


app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500)
    .send({
      code: err.code,
      message: err.message
    });
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
