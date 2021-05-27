const express = require('express');
const app = express();
const port = 8000;
const mongo = require('mongodb')
const bodyParser = require('body-parser');
const session = require('express-session');
// loads environment variables from a .env file into process.env
require('dotenv').config();

let users = null;
let db = null;


// Middleware
app
    .use(express.static('static'))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({   extended: true }))
    .use(session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: true,
        secure: true,
    }))
    

//connection to DB
let url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@users.w6r46.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        throw err;
    } else if (client) {
        console.log('Connected to database');
    }
    db = client.db(process.env.DB_NAME);
    users = db.collection("users");
});

// home
app.get('/', goHome);
// registration
app.get('/registration', getRegistration);
app.get('/registration', registration);
app.post('/registration', createAcc);
// login
app.get('/login',getLogin);
app.post('/login', login);
// forgot
app.get('/forgot', forgot);
// delete
app.get('/delete', deleteAcc);
// 404
app.get('/*', error404);



// from login page to registration page (not logged in)
function getRegistration(req, res) {
    res.render('registration');
}

// shows registration page (not logged in)
function registration(req, res) {
    if (req.session.loggedIN) {
        res.render('succes');
    } else {
        res.render('registration');
    }
}

// going home (logged in)
function goHome(req, res) {
    if (req.session.loggedIN) {
        res.render('succes');
    }  else {
    res.render('index');
    }
}

// Create User on post
function createAcc(req, res) {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    let age = req.body.age;

    let data = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'gender': gender,
        'age': age,
    };
    // Pushes data + input to database
    db.collection('users').insertOne(data, function(err) {
        if (err) {
            throw err;
        } else {
            req.session.loggedIN = true;
            req.session.userId = data.email;
            req.session.userName = data.firstName;
            res.render('succes');
            console.log(+ req.session.userId + 'created a new account');
        }
    })
}
// checks if user exists and logs on
function login(req, res) {
    users.findOne({email: req.body.email})
        .then(data => {
            if (data) {
                if (data.password === req.body.password) {
                    req.session.loggedIN = true;
                    req.session.userId = data.email;
                    req.session.userName = data.voornaam;
                    res.render('succes');
                    console.log('logged in as ' + req.session.userId);
                } else {
                    res.render('index');
                    console.log('password incorrect');
                }
            } else {
                res.render('index');
                console.log('Cant find this account');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteAcc(req, res) {
    users.findOne({email: req.session.userId})
        .then(data => {
                users.deleteOne({email: req.session.userId})
                .then(result => console.log('${result.deletedCount} account is deleted.'))
                .catch(err => console.error('not deleted'));
            req.session.loggedIN = false;
            res.render('index');
            return data;
        })
        .catch(err => console.error(`Error: ${err}`));
}
            
        

// goes to login page
function getLogin(req, res) {
    res.render('login')
}

//forgot password
function forgot(req, res) {
    res.render('forgot');
}

// 404 error
function error404(req, res) {
    res.render('404');
}

// shows which port is used
app.listen(8000, () => console.log('App is listening on port', port));