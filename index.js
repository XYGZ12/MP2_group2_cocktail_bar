//needed packages
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const { check, validationResult} = require('express-validator');

const router = require('./router');

//express object
const app = express();

//environmet variables 
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || '3000';

//templating engine
app.set('view engine', 'ejs');

//set the assets for folder
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// configure the session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//specify the routers
app.use('/', router);

//server
app.listen(port, () => {
    console.log(`The server is at http://${hostname}:${port}.`);
});

