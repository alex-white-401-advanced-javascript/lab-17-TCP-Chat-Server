'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};
let allowedEvents = ['error', 'save'];

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Welcome', id);
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
    console.log('Goodbye', id);
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);
  if( allowedEvents.includes(event)) {
    console.log(`BROADCAST: ${event}`);
    for (let socket in socketPool) {
      socketPool[socket].write(`${event} ${payload}\n`);
    }
  }
  else {
    console.log(`IGNORE: ${event}`);
  }
};