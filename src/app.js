'use strict';

const net = require('net');
const client = new net.Socket();
client.connect(3001, 'localhost', () => {});

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Read/Write should be done in promises, not callbacks
// File Reading/Writing/Uppercasing should happen in one module
// Each operation should be in a separate function


const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from( buffer.toString().trim().toUpperCase());

// client.write('save', Buffer.from('suck it'));

const alterFile = (file) => {

  loadFile(file)

    .then( buffer => convertBuffer(buffer), console.log('Read it'))

    .then( buffer => saveFile(file, buffer))

    .then( success =>
      client.write('save', Buffer.from('Saved Succesfully!')) )

    .catch( error => client.write('error', Buffer.from(`${error}`)) );
};



let file = process.argv.slice(2).shift();
alterFile(file);
