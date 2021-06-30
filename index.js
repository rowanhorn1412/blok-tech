const express = require('express');
const session = require('express-session');
const mongo = require('mongodb')
const app = express();
const port = 8000;

// const bodyParser = require('body-parser');

// loads environment variables from a .env file into process.env
const dotenv = require('dotenv').config();

let db;
let users;


console.log(process.env.TESTVAR)

// Middleware
app
    .use(express.static('static'))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .use(express.urlencoded({extended: true}))
    .use(express.json()) // To parse the incoming requests with JSON payloads
    .use(session({
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
        secure: true,
    }))
    

//connection to DB
let url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@user.l8lxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        console.log('Database is niet connected');
        throw err;
    } else if (client) {
        console.log('Connected to database');
    }
    db = client.db(process.env.DB_NAME);
    users = db.collection(process.env.DB_NAME);
    users.createIndex({ email: 1 }, { unique: true });
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
// password change
app.get('/changePassword', passwordForm);
app.post('/edit', passwordChange);
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
    console.log(req.session);
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
            console.log(+ req.session.firstName + 'created a new account');
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
                    req.session.userName = data.firstName;
                    res.render('succes');
                    console.log('logged in as ' + req.session.userId);
                } else {
                    res.render('login');
                    console.log('password incorrect');
                }
            } else {
                res.render('login');
                console.log('Cant find this account');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function passwordForm(req, res) {
    res.render('changePassword');
}

function passwordChange(req, res) {
    if (req.session.loggedIN) {
        users
            .findOne({
                email: req.session.userId,
            })
            .then(data => {
                if (data) {
                    const query = { email: req.session.userId };
                    // Wat wil je aanpassen
                    const update = {
                        '$set': {
                            'email': req.session.userId,
                            'password': req.body.nieuwwachtwoord,
                        }
                    };
                    const options = { returnNewDocument: true };
                    users
                        .findOneAndUpdate(query, update, options)
                        .then(updatedDocument => {
                            if (updatedDocument) {
                                req.session.loggedIN = false;
                                res.render('index');
                            }
                            return updatedDocument;
                        })
                        .catch(err => console.error(`Gefaald om het te updaten door error: ${err}`));
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.render('index');
        console.log('u bent niet ingelogd');
    }
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