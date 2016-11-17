var creds = require('./config/twilio');
var twilio = require('twilio')(creds.SID, creds.Token);

var textSMS = {};

textSMS.checkIn = function(name, cb) {
  twilio.sendMessage({
    to: '+19173925602',
    from: '+14152001765',
    body: name + ' arrived home safe and sound!'
  }, function(err, resData) {
    if (err) {
    	cb(err);
    } else {
      cb();
    }
  });
};

textSMS.choreList = function(chores, cb) {
  twilio.sendMessage({
    to: '+19173925602',
    from: '+14152001765',
    body: 'Today\'s chores: ' + chores
  }, function(err, resData) {
    if (err) {
      cb(err)
    } else {
      cb();
    }
  });
};

module.exports = textSMS;
