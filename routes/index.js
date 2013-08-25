
/*
 * GET home page.
 */

lanyard = require('lanyard-speakers');

exports.index = function(req, res){
  var options = {
    hostname: 'lanyrd.com',
    path: '/series/wd42/'
  }

  lanyard.getSpeakers(options, function(speakers){
    res.render('index', { title: 'Welcome to Web Developer 42&deg;', speakers: speakers });
  });
};
