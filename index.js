//needed packages
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const { check, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

//express object
const app = express();

//templating engine
app.set('view engine', 'ejs');

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

//environmet variables 
const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || '3000';

//set the assets for folder
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));

//route for the login page
app.get('/', (req, res) => {
    res.render('login', {title: 'Login Page'});
});


//login credentials
const credential = {
    email: 'cocktailbar@test.com',
    password: 'cocktailbar123'
};

//route for autheticate a user
app.post('/login', check('email').notEmpty(),(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.send('validation failed');
    };
        if(req.body.email == credential.email && req.body.password == credential.password) {
            //create session
            req.session.user = req.body.email;
            // console.log(req.session.user);
            res.redirect('/dashboard');
        } else {
            res.end('Invalid Credentials');
        }
});

// route to dashboard
app.get('/dashboard', async (req, res) => {
    try {
        const catData = await fetchCatData(); // Assuming you have the fetchCatData function as previously defined
        res.render('dashboard', { title: 'Dashboard', user: req.session.user, catData });
        
        // Add the code to fetch additional cat data here
        const request = require('request');
        const name = 'abyssinian';
        request.get({
            url: 'https://api.api-ninjas.com/v1/cats?name=' + name,
            headers: {
                'X-Api-Key': 'xGPA7yKzRTfv7Wz+2+DEKQ==xD0XErJY3yajbFeL' 
            },
        }, function (error, response, body) {
            if (error) return console.error('Request failed:', error);
            else if (response.statusCode !== 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else console.log(body);
        });
    } catch (error) {
        console.error('Error fetching cat data:', error);
        res.render('dashboard', { title: 'Dashboard', user: req.session.user, catData: null, error: 'Error fetching cat data' });
    }
});

// route to destroy session
app.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.send("Error");
        }else{
            res.render('login', {title: 'Login Page', logout: 'Logout Successfully!'});
        }
    })
});

//server
app.listen(port, () => {
    console.log(`The server is at http://${hostname}:${port}.`);
});

