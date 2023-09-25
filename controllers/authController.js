// authController.js
const luna = require('luna');
const jwt = require('../utils/jwt'); // Reemplaza con la ubicación correcta del módulo jwt

// Función para manejar la autenticación
async function login(req, res) {
  const { email, password } = req.body;
  
  // Implementa la lógica de autenticación con Luna
  const user = await luna.authenticate(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Genera un token JWT
  const token = jwt.sign({ userId: user.id });

  res.json({ token });
}

module.exports = {
  login,
};
