import util from 'util';
import multer from 'multer';

const DIR = './public/uploads/';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    },
});

let upload = multer({
    storage: storage,

}).single("file");

let fileUploadMiddleware = util.promisify(upload);

export default fileUploadMiddleware;