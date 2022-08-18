require('dotenv').config();
const http = require('http');
const app = require('./app')
const {connectMongo} = require ('./services/mongo');

const server = http.createServer(app);

async function startServer(){
    await connectMongo();
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}

startServer();