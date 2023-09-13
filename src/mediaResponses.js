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
  const file = path.resolve(__dirname, filePath);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') { response.writeHead(404); }
      return response.end(err);
    }
    let { range } = request.headers;
    if (!range) { range = 'bytes=0-'; }

    const positions = range.replace(/bytes=/, ' ').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) { start = end - 1; }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes  ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-length': chunksize,
      'Content-Type': fileType,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

module.exports = {
  getMedia, party, bird, bling,
};
