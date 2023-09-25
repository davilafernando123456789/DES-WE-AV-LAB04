// utils/jwt.js
const jwt = require('jsonwebtoken');

// Función para firmar un token JWT
function sign(payload) {
  return jwt.sign(payload, 'tu-secreto-secreto', { expiresIn: '1h' });
}

// Función para verificar un token JWT
function verify(token) {
  return jwt.verify(token, 'tu-secreto-secreto');
}

module.exports = {
  sign,
  verify,
};
