const express = require('express');
const passport = require('passport');
const session = require('cookie-session');
const usersRouter = require('./routers/users.router');
const postsRouter = require('./routers/posts.router');
const viewsRouter = require('./routers/views.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    name: 'KH-Blog',
    keys: [process.env.COOKIE_KEY],
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/', viewsRouter);


module.exports = app;