var fs = require('fs');
var http = require('http');

module.exports = function images(repeat) {
  setTimeout(function() {
    var options = {
      hostname: 'www.rosebay.tased.edu.au',
      path: '/webcam/large.jpg'
    };

    var req = http.request(options, function(res) {
      var imageData = '';
      var timeStamp = new Date(res.headers['last-modified']).getTime();
      var path = './public/img/';
      var feature = path + 'feature.jpg';
      var archive = path + 'archive/' + timeStamp + '.jpg';

      res.setEncoding('binary');
      res.on('data', function(chunk) {
        imageData += chunk;
      });

      res.on('end', function() {
        fs.writeFile(feature, imageData, 'binary', function(err) {
          if (err) throw err;
        });
        fs.writeFile(archive, imageData, 'binary', function(err) {
          if (err) throw err;
        });
        images(1000 * 60 * 5);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.end();
  }, repeat || 0);
};
