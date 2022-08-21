const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport.config');
const usersRouter = require('./routers/users.router');
const postsRouter = require('./routers/posts.router');
const viewsRouter = require('./routers/views.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    name: 'KH-Blog',
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL}),
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/', viewsRouter);


module.exports = app;