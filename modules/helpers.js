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
  };
};

helpers.choresToString = function(chores) {
  var speechOutput = '';

  for (var j = 0; j < chores.length; j++) {
    var taskNum = j + 1;
    var and = '';
    if (chores.length > 1 && j === chores.length - 1) {
      and = 'and ';
    }
    speechOutput += and + taskNum + ': ' + chores[j].title + '... ';
  }

  return speechOutput;
};

helpers.getChore = function(chores, index) {
  for (var i = 0; i < chores.length; i++) {
    if (chores[i].index === (index - 1)) {
      return chores[i].chore;
    }
  }
};

helpers.getRemainingChores = function(chores) {
  var remainingChores = [];

  for (var i = 0; i < chores.length; i++) {
    if (!chores[i].completed) {
      remainingChores.push({
        index: i + 1,
        chore: chores[i]
      });
    }
  }

  return remainingChores;
};

// Get a list of all uncompleted chores for a child
helpers.remainingChoresToString = function(chores) {
  var speechOutput = '';

  for (var i = 0; i < chores.length; i++) {
    speechOutput += chores[i].index + ': ' + 
                    chores[i].chore.title + '... ';
  }

  return speechOutput;
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

