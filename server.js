'use strict'

//Declarations
const express = require('express');
const bodyParser = require('body-parser');
// const socketRedis = require('socket.io-redis');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./serverConfig.js');
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http, { path: config.socketPath});
const jsonParser  = bodyParser.json({limit:1024*1024*100, type:'application/json'});
const urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*100,type:'application/x-www-form-urlencoding' });
mongoose.Promise = require('bluebird');
app.use(jsonParser);
app.use(urlencodedParser);
// io.adapter(socketRedis({ host: config.redisIp, port: config.redisPort }));

// Initialize our websocket server on port
(function(){
    console.log("Server starting to listen to port "+config.httpPort);
    http.listen(config.httpPort, () => { console.log("Server listening on port "+config.httpPort)});
})();

// Builder Static Files
(function(){
    app.use(express.static(path.join(__dirname, 'webapp/dist')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'webapp/dist/index.html'));
    });
})();


