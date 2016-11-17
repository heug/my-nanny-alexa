'use strict';

var helpers = {};

helpers.randomize = function(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)]; 
};

helpers.alreadyCheckedIn = function(user, childName, cb) {
  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].checkedIn === true) {
        // TURNED OFF FOR TESTING PURPOSES
        // user.children[i].checkedIn = true;
        return cb(true);
      } else {
        return cb(false);
      }
    }
  }
  return cb(undefined);
};

helpers.getChores = function(user, childName, cb) {
  var speechOutput = '';

  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].chores.length === 0) {
        return cb(null);
      }
      
      for (var j = 0; j < user.children[i].chores.length; j++) {
        var taskNum = j + 1;
        var and = '';
        if (user.children[i].chores.length > 1 && j === user.children[i].chores.length - 1) {
          and = 'and ';
        }
        speechOutput += and + taskNum + ': ' + user.children[i].chores[j].title + '... ';
      }
    }
  }
  return cb(speechOutput);
};

helpers.remainingChores = function(user, childName, cb) {
  var speechOutput = '';
  var remChores = [];
  var and = '';

  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].chores.length === 0) {
        return cb(null);
      }
      
      for (var j = 0; j < user.children[i].chores.length; j++) {
        var taskNum = j + 1;
        if (!user.children[i].chores[j].completed) {
          remChores.push([taskNum, user.children[i].chores[j].title]);
        }
      }

      for (var k = 0; k < remChores.length; k++) {
        if (remChores.length > 1 && k === remChores.length - 1) {
          and = 'and ';
        }
        speechOutput += and + remChores[k][0] + ',' + remChores[k][1] + '...';
      }
      
    }
  }
  return cb(speechOutput);
};

helpers.finishChore = function(user, childName, choreNum, cb) {

  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].chores.length === 0) {
        return cb(null);
      }
      if (user.children[i].chores[choreNum - 1].completed === undefined) {
        return cb(undefined);
      } else if (user.children[i].chores[choreNum - 1].completed) {
        return cb(false);
      } else {
        // TODO: Mark task as complete on DB
        return cb(user.children[i].chores[choreNum - 1].title);
      }
    }
  }
  return cb('');
};

helpers.choreDetails = function(user, childName, choreNum, cb) {

  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].chores[choreNum - 1]) {
        return cb(
          user.children[i].chores[choreNum - 1].title, 
          user.children[i].chores[choreNum - 1].details
        );
      } else {
        return cb(null);
      }
    }
  }
  return cb(undefined);
};

module.exports = helpers;
