'use strict';
var helpers = {};

// Return a random phrase from an array of phrases
helpers.randomize = function(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)]; 
};

helpers.getUsersChild = function(user, childName) {
  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      return user.children[i];
    }
  }
};

helpers.choresToString = function(chores) {
  var speechOutput = '';

  for (var j = 0; j < user.children[i].chores.length; j++) {
    var taskNum = j + 1;
    var and = '';
    if (chores.length > 1 && j === chores.length - 1) {
      and = 'and ';
    }
    speechOutput += and + taskNum + ': ' + chores[j].title + '... ';
  }

  return speechOutput;
};

// Get a list of all uncompleted chores for a child
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

// Get the referenced chore and cb with name and data for chore PUT
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
        var data = {
          childId: user.children[i].id,
          choreId: user.children[i].chores[choreNum - 1].id
        }
        return cb(user.children[i].chores[choreNum - 1].title, data);
      }
    }
  }
  return cb('');
};

// Get details for a single chore
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

// Return a list of children
helpers.getChildren = function(user, cb) {
  var speechOutput = '';

  for (var i = 0; i < user.children.length; i++) {
    var and = '';
    if (user.children.length > 1 && i === user.children.length - 1) {
      and = 'and ';
    }
    speechOutput += and + user.children[i].name + '... ';
   
  }
  return cb(speechOutput);
};

module.exports = helpers;

