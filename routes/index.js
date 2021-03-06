var level = require('level');
var lanyard = require('lanyard-speakers');

var db = level('./db', {
  valueEncoding: 'json'
});

var users = [];
var community = {
  total: 0,
  speakers: [],
  attendees: []
};

// load previously cached version
db.createValueStream().on('data', function (user) {
  var type = user.type;
  if (type === 'speaker') community.speakers.push(user);
  if (type === 'attendee') community.attendees.push(user);
  community.total++;
});

var options = {
  hostname: 'lanyrd.com',
  path: '/series/wd42/',
  type: 'all'
};

lanyard.getUsers(options, function(data) {
  users = data;

  var ops = data.map(function(user) {
    return {
      type: 'put',
      key: user.name,
      value: user
    };
  });

  db.batch(ops, function(err) {
    if (err) return console.log(err);
  });
});

exports.index = function(req, res){
  res.render('index', {
    title: 'Welcome to Web Developer 42&deg;',
    users: users,
    community: community 
  });
};
