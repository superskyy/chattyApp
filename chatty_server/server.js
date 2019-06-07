// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size);
  wss.clients.forEach(client => {
    client.send(JSON.stringify({type: "counter", size: wss.clients.size}));  
  });
  ws.on('message', (event) => {
  	let fullcontent = JSON.parse(event);
    fullcontent.id = uuidv4();
    fullcontent.type = fullcontent.type.replace('post', 'incoming');
  	console.log(fullcontent);
    wss.clients.forEach(client => {
      client.send(JSON.stringify(fullcontent));
    });
  });
  ws.on('close', () => {
    wss.clients.forEach(client => {
    client.send(JSON.stringify({type: "counter", size: wss.clients.size}));  
    });
    console.log('Client disconnected')
  });
});