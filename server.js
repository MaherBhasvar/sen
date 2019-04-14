const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const search = require('./routes/api/search');

var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var api = express.Router();

const app = express();


//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//app.get('/', (req, res) => res.send('Hello World'));

//use routes
app.use('/api/posts',posts);
app.use('/api/profile',profile);
app.use('/api/users',users);
app.use('/api/search',search);


// Middleware error handler for json response
// function handleError(err,req,res,next){
//     var output = {
//         error: {
//             name: err.name,
//             message: err.message,
//             text: err.toString()
//         }
//     };
//     var statusCode = err.status || 500;
//     res.status(statusCode).json(output);
// }
// // error handling middleware last
// api.use( [
//     handleError
//     ] );

//Flash middleware

    // app.use(cookieParser('keyboard cat'));
    // app.use(session({ cookie: { maxAge: 60000 }}));
    // app.use(require('flash')());


const port = process.env.PORT || 5000; 
//process.env.PORT for Heroku

app.listen(port, () => console.log(`Server Running on Port ${port}`));
module.exports.app = app;