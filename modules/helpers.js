'use strict';
var helpers = {};

// Return a random phrase from an array of phrases
helpers.randomize = function(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)]; 
};

// Check if child already checked in for the day
helpers.checkIn = function(res, user, childName, cb) {
  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      return cb(false, childName);
      // TODO: uncomment below once checkedIn status implemented
      // if (user.children[i].checkedIn === true) {
      //   // user.children[i].checkedIn = true;
      //   return cb(true);
      // } else {
      //   return cb(false);
      // }
    }
  }
  return cb(res, undefined, childName);
};

// Return a list of chores and child id; null if child is not in account
helpers.getChores = function(res, user, childName, cb) {
  var speechOutput = '';
  var childNum = '';

  for (var i = 0; i < user.children.length; i++) {
    if (user.children[i].name === childName) {
      if (user.children[i].chores.length === 0) {
        return cb(res, null);
      }
      childNum = user.children[i].phone;
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
  return cb(res, speechOutput, childNum);
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

helpers.handleChildChores = function(res, choreList, childNum) {
  if (choreList === null) {
    speechOutput += "You have no chores today!";
    return res.tell(speechOutput);
  } else {
    var repromptOutput = "If you'd like to receive a list of chores on your phone, \
                          please say, send chores.";
    speechOutput += "Your chores today are... " + choreList + repromptOutput;
    return res.ask(speechOutput, repromptOutput);
  }
};

helpers.handleChildCheckIn = function(res, alreadyCheckedIn, childName) {
  if (alreadyCheckedIn) {
    return res.tell(childName + ", you have already been checked in!");
  }
  if (alreadyCheckedIn === undefined) {
    return res.tell(childName + ", is not a recognized child, please try again");
  }
  
  var speechOutput = "Welcome home, " + childName + ". Your parent has been notified \
                      of your safe arrival. ";
  return helpers.getChores(res, user, childName, helpers.handleChildChores);  
};

module.exports = helpers;

