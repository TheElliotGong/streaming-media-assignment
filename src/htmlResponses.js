/*
Author: Elliot Gong
Purpose: Handle server responses that send back html pages to the client.
Date: 9/15/2023
*/

// Set necessary variables.
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

/**
 * This funcion returns a web page using the given url on the server
 * @param {*} request
 * @param {*} response
 * @param {*} page the html page to return.
 */
const getPage = (request, response, page) => {
  response.writeHead(200, { 'Content-type': 'text/html' });
  response.write(page);
  response.end();
};
module.exports = {
  getPage, index, page2, page3,
};
