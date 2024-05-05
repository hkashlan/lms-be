import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.FILE_UPLOAD_PATH || './client/files';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileParts = file.originalname.split('.');
    cb(null, fileParts[0] + '-' + uniqueSuffix + '.' + fileParts[1]);
  },
});
