const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const mongodb = require('./db/connect');

// Import the cors middleware
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const port = process.env.PORT || 8080;
const app = express();

require('./config/passport-setup')(passport);

app.set('view engine', 'ejs');

//  connect to mongodb
mongoose.connect(keys.mongodb.URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB: ' + error);
    });
app.get('/', (req, res) => {
    res.render('home');
});

app
    .use(bodyParser.json())
    .use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.authenticate('session'))
    .use('/auth', authRoutes)
    .use(cors({ origin: '*' }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next();
    })
    .use('/', require('./routes/index'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});