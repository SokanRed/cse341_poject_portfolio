const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
// Import the cors middleware
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

app
    .use(bodyParser.json())
    .use(cors({ origin: '*' }))
    .use((req, res, next) => {
        res.setHeaderheader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Max-Age', 86400); // 1 day
            res.sendStatus(204);
        } else {
            next();
        }
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