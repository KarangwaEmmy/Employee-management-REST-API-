import path from 'path';
import multer from 'multer';

const uploadedFiles = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../../../Server/public/uploads'));
  },
  filename: (req, file, cb) => {
    const extensions = ['image/png', 'image/jpeg', 'image/pjpeg', 'video/mp4', 'application/x-mpegURL'];

    if (extensions.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invaliid. Enter a valid image or video and try again.`;
      cb(message, null);
    }

    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// eslint-disable-next-line import/prefer-default-export
export const uploadFiles = multer({ storage: uploadedFiles }).array('files', 6);
