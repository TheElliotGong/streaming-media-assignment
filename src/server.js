/*
Author: Elliot Gong
Purpose: Handle server responses to the client browser.
Date: 9/15/2023
*/

// Include all necessary scripts and variables.
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
/**
 * This function handles server responses based on client url requests.
 * @param {*} request
 * @param {*} response
 */
const onRequest = (request, response) => {
//   console.log(request.url);

  // Return appropriate pages/media files based on end url.
  switch (request.url) {
    case '/index':
      htmlHandler.getPage(request, response, htmlHandler.index);
      break;
    case '/page2':
      htmlHandler.getPage(request, response, htmlHandler.page2);
      break;
    case '/page3':
      htmlHandler.getPage(request, response, htmlHandler.page3);
      break;
    case '/bling.mp3':
      mediaHandler.getMedia(request, response, mediaHandler.bling, 'audio/mp3');
      break;
    case '/bird.mp4':
      mediaHandler.getMedia(request, response, mediaHandler.bird, 'video/mp4');
      break;
    case '/party.mp4':
      mediaHandler.getMedia(request, response, mediaHandler.party, 'video/mp4');
      break;
    default:
      htmlHandler.getPage(request, response, htmlHandler.index);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
//   console.log(`Listening in on 127.0.0.1:${port}`);
});
