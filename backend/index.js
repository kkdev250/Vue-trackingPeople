const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = 3002;
var app = express();
var server = http.createServer(app);

app.use(cors());
app.use(bodyParser());

app.use(router);

server.listen(port, () => {
  console.log(`Server is up on ${port} (http)`);
});
