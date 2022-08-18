const express = require('express');
const usersRouter = require('./routers/users.router');
const postsRouter = require('./routers/posts.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/users', usersRouter);
app.use('/posts', postsRouter);


module.exports = app;