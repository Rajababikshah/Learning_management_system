const multer = require('multer');
const storage = multer.memoryStorage(); // keep buffer in memory
const upload = multer({ storage });

module.exports = upload;
