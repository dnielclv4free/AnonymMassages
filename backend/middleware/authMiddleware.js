// Di file: middleware/authMiddleware.js (Versi Final)

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Ambil token dari Authorization header
  const authHeader = req.headers.authorization;

  // 2. Cek jika header atau token tidak ada
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send("A token is required for authentication.");
  }

  // 3. Ekstrak token dari format "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // 4. Verifikasi token menggunakan callback
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tempelkan payload token (yang berisi info user) ke objek request
    // Menggunakan req.user adalah konvensi yang sangat umum
    req.user = decoded; 

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  // 5. Jika token valid, lanjutkan ke controller berikutnya
  return next();
};

module.exports = authMiddleware;
