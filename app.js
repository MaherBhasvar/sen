var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var port = 8080;

const mongoose = require('mongoose');
const passport = require('passport');

// models
var models = require("./models");

// routes
var books = require('./routes/books');
var application = require('./routes/application');
var computer = require('./routes/computer');
var department = require('./routes/department');
var email = require('./routes/email');
var lookup = require('./routes/lookup');
var project = require('./routes/project');
var survey = require('./routes/survey');
var surveyResponses = require('./routes/surveyResponses');
var team = require('./routes/team');
var user = require('./routes/user');
var login = require('./routes/login');

const _USERS = require('./data/user.json');
const _LOOKUPTYPE = require('./data/lookupType.json');
const _LOOKUPDATA = require('./data/lookupData.json');
const _EMAILSERVERCONFIG = require('./data/EmailServerConfig.json');
var User = require('./models').User;
var LookupType = require('./models').LookupType;
var LookupData = require('./models').LookupData;
var EmailServerConfig = require('./models').EmailServerConfig;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);













//Sync Database
models.sequelize.sync()
.then(() => {
        User.bulkCreate(_USERS)
            .then(users => {
                console.log('Success adding users');
            })
            .catch(error => {
                console.log(error);
            }),
        LookupType.bulkCreate(_LOOKUPTYPE)
            .then(users => {
                console.log('Success adding Lookup Type');
            })
            .catch(error => {
                console.log(error);
            }),
        LookupData.bulkCreate(_LOOKUPDATA)
            .then(users => {
                console.log('Success adding Lookup Data');
            })
            .catch(error => {
                console.log(error);
            }),
        EmailServerConfig.bulkCreate(_EMAILSERVERCONFIG)
            .then(users => {
                console.log('Success adding Email Server');
            })
            .catch(error => {
                console.log(error);
            })
        
    })
.then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});



// register routes
app.use('/books', books);
app.use('/applications', application);
app.use('/computers', computer);
app.use('/departments', department);
app.use('/emailTemplate', email);
app.use('/lookup', lookup);
app.use('/projects', project);
app.use('/surveyQuestions', survey);
app.use('/surveyResponses', surveyResponses);
app.use('/teams', team);
app.use('/users', user);
app.use('/admin/login',login);

// index path
app.get('/', function(req, res){
    console.log('app listening on port: '+port);
    res.send('tes express nodejs sqlite')
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports = app;