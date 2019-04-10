'use strict';

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', () => {});

// const logger = module.exports = {};

// logger.save = (payload) => {
//   if( payload ) {
//     console.log('Payload baby', payload);
//   }
// };

// logger.err = (payload) => {
//   if( payload ) {
//     console.error('Error baby', payload);
//   }
// };

// client.on('save', logger.save);
// client.on('error', logger.err);

client.on('data', ( payload ) => {
  console.log('Got a bite:', payload.toString().trim());
});

client.on('error', ( payload ) => {
  console.log('Error: only a nibble:', payload.toString().trim());
});

