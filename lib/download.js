var fs = require('fs');
var http = require('http');

module.exports = function images() {
  var options = {
    hostname: 'www.rosebay.tased.edu.au',
    path: '/webcam/large.jpg'
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    var image = '';
    res.setEncoding('binary');
    res.on('data', function (chunk) {
      image += chunk;
    });

    res.on('end', function() {
      fs.writeFile('./public/img/feature.jpg', image, 'binary', function(err) {
        if (err) throw err;
      });
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
};
