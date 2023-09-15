const fs = require('fs');

const party = '../client/party.mp4';
const bird = '../client/bird.mp4';
const bling = '../client/bling.mp3';
const path = require('path');

/**
 * This function returns the media file requested from the user and plays it in the current tab.
 * @param {*} request
 * @param {*} response
 * @param {*} filePath the media file's location.
 * @param {*} fileType the media file's type.
 */
const getMedia = (request, response, filePath, fileType) => {
  //Locate the file.
  const file = path.resolve(__dirname, filePath);
  
  fs.stat(file, (err, stats) => {
    if (err) {
      //If file couldn't be loaded, return a 404 error page.
      if (err.code === 'ENOENT') { response.writeHead(404); }
      return response.end(err);
    }
    //Determine the range of file's bytes we want to return to the user.
    let { range } = request.headers;
    if (!range) { range = 'bytes=0-'; }
    //Split byte array to get beginning and end positions.
    const positions = range.replace(/bytes=/, '').split('-');

    const total = stats.size;
    //Determine start and current end byte positions of file as well as difference in bytes from start to end.
    let start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) { start = end - 1; }

    const chunksize = (end - start) + 1;
    //Write the valid media file back to the client using the calculated data.
    response.writeHead(206, {
      'Content-Range': `bytes  ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-length': chunksize,
      'Content-Type': fileType,
    });
    //Stream the file starting from the start and end portions
    const stream = fs.createReadStream(file, { start, end });
    //Connect file to response upon opening.
    stream.on('open', () => {
      stream.pipe(response);
    });
    //End response upon file streaming error.
    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

module.exports = {
  getMedia, party, bird, bling,
};
