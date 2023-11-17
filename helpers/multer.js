const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../public/uploads')); // Ruta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Genera un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Configuración de la función de filtrado de archivos
const fileFilter = (req, file, cb) => {
  // Verifica el tipo de archivo permitido (ejemplo: solo imágenes)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido'));
  }
};

// Configuración del middleware de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;