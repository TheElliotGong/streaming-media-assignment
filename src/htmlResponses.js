const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);
const getPage = (request, response, page) => {
  response.writeHead(200, { 'Content-type': 'text/html' });
  response.write(page);
  response.end();
};
module.exports = {
  getPage, index, page2, page3
};
