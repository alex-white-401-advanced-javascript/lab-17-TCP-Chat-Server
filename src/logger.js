'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => {});


client.on('data', ( payload ) => {
  console.log('Got a bite:', payload.toString().trim());
});

client.on('error', ( payload ) => {
  console.log('Error: only a nibble:', payload.toString().trim());
});

