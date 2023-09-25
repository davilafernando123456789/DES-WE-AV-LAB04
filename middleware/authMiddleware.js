// authMiddleware.js
const jwt = require('../utils/jwt'); // Reemplaza con la ubicación correcta del módulo jwt

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}

module.exports = {
  verifyToken,
};