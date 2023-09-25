const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');

app.use(express.static('public'));

// Middleware para analizar JSON en solicitudes POST
app.use(express.json());

// Middleware para analizar datos codificados en solicitudes POST
app.use(express.urlencoded({ extended: true }));


const http = require('http')
const server = http.createServer(app)

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Node'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});



const {Server} = require('socket.io')
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('App sw chat de Jose Davila')
   // Procedimiento 4:
   socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})


// app.get('/', (req, resp) => {
//     resp.send('<h1>Aplicacion de chat de Fernando Davila')
// })

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Consulta a la base de datos para verificar las credenciales
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Error en la base de datos' });
      }
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      const user = rows[0];
  
      // Verificar la contraseña
      bcrypt.compare(password, user.password, (bcryptErr, result) => {
        if (bcryptErr || !result) {
          return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
  
        // Generar un token JWT
        const token = jwt.sign({ userId: user.id }, 'tu-secreto-secreto');
  
        // Almacenar el token en una cookie (puedes utilizar express-jwt-cookie)
        res.cookie('jwt', token);
  
        res.json({ message: 'Inicio de sesión exitoso', token });
      });
    });
  });
  
  // Ruta para cerrar sesión
  app.get('/logout', (req, res) => {
    // Elimina la cookie que contiene el token
    res.clearCookie('jwt');
    res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
  });
  
// Ruta para el registro de usuarios
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    // Verifica si el usuario ya existe en la base de datos
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Error en la base de datos' });
      }
  
      if (rows.length > 0) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
  
      // Hashea la contraseña antes de guardarla en la base de datos
      bcrypt.hash(password, 10, (bcryptErr, hash) => {
        if (bcryptErr) {
          return res.status(500).json({ message: 'Error al hashear la contraseña' });
        }
  
        // Guarda el usuario en la base de datos
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (insertErr) => {
          if (insertErr) {
            return res.status(500).json({ message: 'Error al registrar el usuario' });
          }
  
         // res.json({ message: 'Usuario registrado con éxito' });
          // Después de guardar el usuario en la base de datos
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión

        });
      });
    });
  });
  
app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/index.html`)
})

app.get('/login', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/login.html`)
})
app.get('/register', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/register.html`)
})
app.get('/register', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/register.html`)
})
app.get('/chat', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/social_feed.html`)
})
app.get('/sms', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/chat_view.html`)
})


server.listen(3000,() => {
    console.log('Servidor corriendo en http://localhost:3000')
})