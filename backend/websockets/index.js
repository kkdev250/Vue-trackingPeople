const http = require('http');
const WebSocket = require('ws');
const express = require('express');

var app = express();
var server = http.createServer(app);

let clients = 6;

const wss = new WebSocket.Server({
  port: 3004
});

wss.on('connection', (ws) => {
  console.log('connected with websockets on 3004')
});


const broadcastFetchPeople = (data, ws) => {
  wss.clients.forEach((client) => {
      client.send(JSON.stringify({type: 'fetch-people'}))
      console.log('sent websockets \'fetch-people\'');
  })
}

var exports = module.exports = {};

exports.clients = wss.clients;
exports.wss = wss;
exports.broadcastFetchPeople = broadcastFetchPeople;
