const multer = require('multer');

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null , '../client/public/uploads/');
    },
    filename : function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage : storage});
module.exports = uploads;