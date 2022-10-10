require('./services/passport');

const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const usersRouter = require('./routers/users.router');
const postsRouter = require('./routers/posts.router');
const viewsRouter = require('./routers/views.router');
const authRouter = require('./routers/auth.router');
const uploadRouter = require('./routers/upload.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    name: 'KH-Blogs',
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
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/', viewsRouter);


module.exports = app;