// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const secureRoute = require('./routes/secureRoute');
// ...

app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/secure', secureRoute); // Rutas protegidas
// ...

// Configuración adicional de Express
// ...

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
