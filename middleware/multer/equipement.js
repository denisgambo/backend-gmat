const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
   'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/webp': 'webp', // WebP est un format d'image moderne
  'image/tiff': 'tiff', // TIFF (Tagged Image File Format)
  'image/svg+xml': 'svg', // SVG (Scalable Vector Graphics)
  'image/ico': 'ico' // ICO (Icon image format)
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const isValidMimeType = Object.keys(MIME_TYPES).includes(file.mimetype);
    if (isValidMimeType) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  }
});

module.exports = upload.single('image_equipement');
