const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport.config');
const usersRouter = require('./routers/users.router');
const postsRouter = require('./routers/posts.router');
const viewsRouter = require('./routers/views.router');
const loginRouter = require('./routers/login.router');
const composeRouter = require('./routers/compose.router');
const myPostsRouter = require('./routers/my-posts.router');
const googleRouter = require('./routers/googleAuth.router');
const uploadRouter = require('./routers/upload.router');
const registerRouter = require('./routers/register.router');

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
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/compose', composeRouter);
app.use('/my-posts', myPostsRouter);
app.use('/auth', googleRouter);
app.use('/', uploadRouter);
app.use('/', viewsRouter);


module.exports = app;