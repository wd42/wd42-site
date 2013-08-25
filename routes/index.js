
/*
 * GET home page.
 */

var level = require('level');
var lanyard = require('lanyard-speakers');

var db = level('./db', {
  valueEncoding: 'json'
});

var speakers = [];

var options = {
  hostname: 'lanyrd.com',
  path: '/series/wd42/'
};

lanyard.getSpeakers(options, function(data) {
  var ws = db.createValueStream();
  var ops = [];

  data.forEach(function(speaker) {
    ops.push({
      type: 'put',
      key: speaker.name,
      value: speaker,
    });
  });

  db.batch(ops, function(err) {
    if (err) return console.log(err);
  });

  ws.on('data', function (data) {
    speakers.push(data);
  });
});

exports.index = function(req, res){
  res.render('index', {
    title: 'Welcome to Web Developer 42&deg;',
    speakers: speakers
  });
};
