require('dotenv').config();
const PORT = process.env.PORT;
const DB_PATH = process.env.DB_PATH;

const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');

const {authMiddleware} = require('./back-end/src/middlewares/authMiddleware');
const {usersArray} = require('./back-end/src/data/users');
const {usersRegistration} = require('./back-end/src/services/userService');

const {SteamError} = require('./back-end/src/utils/errors');

const {authRouter} = require('./back-end/src/controllers/authController');
const {profileRouther} = require('./back-end/src/controllers/profileController');
const {gamesRouther} = require('./back-end/src/controllers/gamesController');
const {friendsRouther} = require('./back-end/src/controllers/friendsController');


app.use(express.static(__dirname + '/front-end/dist/steam'));
// app.use(express.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));

app.use(express.json());
app.use(morgan('tiny'));


app.use('/api/auth', authRouter);
app.use('/api/profile', [authMiddleware], profileRouther);
app.use('/api/games', [authMiddleware], gamesRouther);
app.use('/api/friends', [authMiddleware], friendsRouther);

app.use((err, req, res, next) => {
  console.log('==app.use((err, req, res, next) %% ', err);
  if (err instanceof SteamError) {
    console.log('==app.use((err, req, res, next) ');
    console.log({err});
    return res.status(err.status).json({
        message: err.message,
        status: err.status
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/front-end/dist/steam/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({
    message: `The requested URL ${req.url} was not found`,
  });
});


(async () => {
  try {
    await mongoose.connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    usersArray.forEach(usersRegistration);

    app.listen(process.env.PORT || 8080);
  } catch (err) {
    console.error(`Error with server startup: ${err.message}`);
  }
})();
