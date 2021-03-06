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

/**
 * @function LoadFile(file) reads a given file returning a buffer
 * @param file - A given file
 */
const loadFile = (file) => readFile(file);

/**
 * @function saveFile(file,buffer) saves a buffer to a file
 * @param  {} file - file to save to
 * @param  {} buffer - buffer to save
 */
const saveFile = (file, buffer) => writeFile(file, buffer);

/**
 * @function convertBuffer(buffer) - takes in a buffer and changes it to all uppercase
 * @param  {} buffer - buffer to change
 */
const convertBuffer = buffer => Buffer.from( buffer.toString().trim().toUpperCase());

/**
 * @function alterFile - takes in a file, changes its contents, then writes it back
 * @param file - file to be read, changed, and saved
 */
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
