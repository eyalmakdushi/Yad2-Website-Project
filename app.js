/**
 * The main application file for the web server orchestrates the setup of the Express application, including middleware,
 * routes, and error handling. It also initializes session management, view engine, logging, static file serving,
 * and database synchronization. Additionally, it manages the handling of 404 Not Found errors and internal server errors.
 */

// ------------------
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/index');
const app = express();
// -------------------

// session
app.use(session({
    secret:"supersecret",
    resave: false,
    saveUninitialized: false
}));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));

// routes
app.use('/', indexRouter);

// catch 404
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

const db = require('./models/index');
// Create database tables if they don't exist
db.sequelize.sync()
    .then(() => {
        console.log('Database Synced');
        return Promise.all([
            db.User.findOrCreate({
                where:{login:'admin'},
                defaults:{login:'admin',password:'admin'}
            }),
            db.User.findOrCreate({
                where:{login:'admin2'},
                defaults:{login:'admin2',password:'admin2'}
            })
        ]);
    }).then(()=>{
    console.log('Admin user created');
})
    .catch((err) => {
        console.log('Error syncing database or creating admin users');
        console.log(err);
    });

module.exports = app;
