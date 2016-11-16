'use strict';

var helpers = {};

helpers.randomize = function(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)]; 
};

helpers.alreadyCheckedIn = function(user, childName) {
  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].checkedIn === true) {
        // TURNED OFF FOR TESTING PURPOSES
        // user.children[i].checkedIn = true;
        return true;
      } else {
        return false;
      }
    }
  }
  return undefined;
};

helpers.getChores = function(user, childName) {
  var speechOutput = '';

  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].chores.length === 0) {
        return null;
      }
      
      var remChores = [];
      
      for (var j = 0; j < user.children[i].chores.length; j++) {
        if (user.children[i].chores[j].completed === false) {
          remChores.push(user.children[i].chores[j]);
        }
      }
      for (var k = 0; k < remChores.length; k++) {
        var and = '';
        if (remChores.length > 1 && k === remChores.length - 1) {
          and = 'and ';
        }
        speechOutput += and + remChores[k].title + ', ';
      }
    }
  }

  return speechOutput;

};

helpers.options = {
  method: 'POST',
  uri: 'http://localhost:1337/api/',
  body: {

  },
  json: true // Automatically stringifies the body to JSON
};

module.exports = helpers;
