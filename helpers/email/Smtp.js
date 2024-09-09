const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {
    send(email, subject, template, context) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tustramitesecu@gmail.com",
                pass: "quqtmcyxdqqxzvrj"
            }
        });

        transporter.use('compile', hbs({
            viewEngine: {
                extName: '.handlebars',
                partialsDir: 'helpers/email/template',
                layoutsDir: 'helpers/email/template',
                defaultLayout: template + '.handlebars',
            },
            viewPath: 'helpers/email/template',
            extName: '.handlebars',
        }));

        const mailOptions = {
            from: "tustramitesecu@gmail.com",
            to: email,
            subject: subject,
            template: template,
            context: context
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
