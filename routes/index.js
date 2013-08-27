/*
 * GET home page.
 */

var level = require('level');
var lanyard = require('lanyard-speakers');

var db = level('./db', {
  valueEncoding: 'json'
});

var speakers = [];

// load previously cached version
db.createValueStream().on('data', function (speaker) {
  speakers.push(speaker)
})

var options = {
  hostname: 'lanyrd.com',
  path: '/series/wd42/'
};

lanyard.getSpeakers(options, function(data) {
  speakers = data

  // write a new version, note that this doesn't delete
  // any that don't exist in the new version but existed in
  // the old version
  var ops = data.map(function(speaker) {
    return {
      type: 'put',
      key: speaker.name,
      value: speaker,
    };
  });

  db.batch(ops, function(err) {
    if (err) return console.log(err);
  });
});

exports.index = function(req, res){
  res.render('index', {
    title: 'Welcome to Web Developer 42&deg;',
    speakers: speakers
  });
};
