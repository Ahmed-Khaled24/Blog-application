const env = (process.env.NODE_ENV).trim();
let keys;
if (env === 'production'){
    keys = require('./production');
} else if (env === 'dev') {
    keys = require('./dev');
}

module.exports = keys;