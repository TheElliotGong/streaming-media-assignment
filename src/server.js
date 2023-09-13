const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
//   console.log(request.url);

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
