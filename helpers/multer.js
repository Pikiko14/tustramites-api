const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");


const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    },
});

module.exports = multer({
    storage,
    limits: {
        files: 5,
        fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
            return cb(new Error("Only image are allowed."), false);
        }
        cb(null, true);
    },
});
