// routes/secureRoute.js
const express = require('express');
const secureController = require('../controllers/secureController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Ruta protegida que utiliza el middleware de autenticación
router.get('/profile', authMiddleware.verifyToken, secureController.profile);

module.exports = router;
