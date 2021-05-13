import multer from 'multer';
import { resolve, extname } from 'path';

const numberRandom = () => Math.floor(Math.random() * 1000);

export default {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${numberRandom()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 2 * (1024 * 1024),
  },
  fileFilter(req, file, cb) {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  },
};
