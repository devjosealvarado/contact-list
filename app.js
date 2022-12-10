require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const contactosRouter = require('./controllers/contactos');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a Mongo DB');
  } catch (error) {
    console.log(error);
  }
})();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// Routes backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/contactos', auth, contactosRouter);

// Routes frontend
app.use('/', express.static(path.join(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.join(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.join(__dirname, 'views', 'login')));
app.use('/app/:id', express.static(path.join(__dirname, 'views', 'app')));
app.use('*', express.static(path.join(__dirname, 'views', '404')));

// app.get('/jeje', (request, response) => {
//      response.sendFile(path.join(__dirname, 'views', 'home', 'index.html'));
// });

module.exports = app;
