
/*
 * GET home page.
 */

var level = require('level');

exports.index = function(req, res){
  var db = level('./db', {
    valueEncoding: 'json'
  });
  var speakers = [];

  var ws = db.createValueStream();

  ws.on('data', function (data) {
    speakers.push(data);
  });
  ws.on('close', function (data) {
    res.render('index', {
      title: 'Welcome to Web Developer 42&deg;',
      speakers: speakers
    });
    db.close();
  });
};
