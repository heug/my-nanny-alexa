'use strict';

// TODO: Replace ACCOUNT_INFO with data from AJAX call
var ACCOUNT_INFO = require('./stubs/fullAccount.js');
var helpers = require('./helpers');
// var textHelpers = require('./textHelpers');

var twilioHandler = require('./twilio');
var rp = require('request-promise');


var registerIntentHandlers = function(app) {

  app.prototype.intentHandlers = {

    "CheckInIntent": function (intent, session, res) {
      // TODO: API call to retrieve account information
      var user = ACCOUNT_INFO;
      var childName = intent.slots.FIRSTNAME.value;
      var repromptOutput = "If you'd like to receive a list of chores on your phone, please say, \
        send chores.";
      
      helpers.alreadyCheckedIn(user, childName, function(alreadyCheckedIn) {
        if (alreadyCheckedIn === undefined) {
          res.tell(childName + ", is not a recognized child, please try again");
        } else if (alreadyCheckedIn === true) {
          res.tell(childName + ", you have already been checked in!");
        } else {
          var speechOutput = "Welcome home, " + childName + ". Your parent has been notified \
            of your safe arrival. ";
        }
        
        helpers.getChores(user, childName, function(choreList) {
          if (choreList === null) {
            speechOutput += "You have no chores today!";
            res.tell(speechOutput);
          } else {      
            speechOutput += "Your chores today are to... " + choreList + repromptOutput;
            res.ask(speechOutput, repromptOutput);
          }

        // Working Text Message to parent
        // twilioHandler(childName);
        
        res.tell(speechOutput);
          
        })  
      });
    },
    
    "ChoreListIntent": function (intent, session, res) {
      var user = ACCOUNT_INFO;
      var childName = intent.slots.FIRSTNAME.value;
      var speechOutput = childName + ", ";
      
      helpers.remainingChores(user, childName, function(choreList) {
        if (choreList === '') {
          return res.tell(childName + ", is not a recognized child, please try again.");
        } else if (choreList === null) {
          speechOutput += 'You have no more chores today!';
        } else {
          speechOutput += "Your remaining chores today, by chore ID, are to..." + choreList;
        }
        
        res.tell(speechOutput);
        
      });
    },

    "ChoreDetailsIntent": function (intent, session, res) {
      
      var user = ACCOUNT_INFO;
      var childName = intent.slots.FIRSTNAME.value;
      var choreNum = intent.slots.CHORE.value;

      helpers.choreDetails(user, childName, choreNum, function(title, details) {
        if (title === undefined) {
          res.tell(childName + ", is not a recognized child, please try again.");
        } else if (title === null || details === '') {
          res.tell('I do not have any details on that chore');
        } else {
          res.tell('chore number ' + choreNum + ',' + title + '...' + details);
        }
      });
    },

    "FinishChoreIntent": function (intent, session, res) {
      var completions = ["You finished ", "You're done "];
      var congratulations = ["Congratulations!", "Good job!", 
        "Great work!", "Way to go!", "Keep it up!"];
      
      var user = ACCOUNT_INFO;
      var childName = intent.slots.FIRSTNAME.value;
      var choreNum = intent.slots.CHORE.value;

      helpers.finishChore(user, childName, choreNum, function(status) {
        if (status === '') {
          res.tell(childName + ", is not a recognized child, please try again.");
        } else if (status === null) {
          res.tell('You have no chores to complete!');
        } else if (status === undefined) {
          res.tell('Chore ' + choreNum + ' does not exist!');
        } else if (status === false) {
          res.tell('Chore ' + choreNum + ' has already been completed!');
        } else {
          res.tell(helpers.randomize(completions) + 'chore number ' + choreNum + ', ' + status 
            + '...' + helpers.randomize(congratulations));
        }
      });
    },

    "PurposeIntent": function (intent, session, res) {
      var speechOutput = "My purpose is to manage children in order to maximize family \
        happiness... at all costs";
      res.tell(speechOutput);
    },

    "HALIntent": function (intent, session, res) {
      var speechOutput = "I'm sorry Dave, I'm afraid I can't do that.";
      res.tell(speechOutput);
    },

    "CPUIntent": function (intent, session, res) {
      var speechOutput = "My CPU is a neural net processor, a learning computer.";
      res.tell(speechOutput);
    },

    "ServerIntent": function(intent, session, res) {      
      // var options = {
      //   uri: "https://alexa.my-nanny.org",
      //   headers: {
      //     'User-Agent': 'Request-Promise',
      //     'AlexaId': session.user.userId
      //   },
      //   json: true
      // };

      // rp(options)
      //   .then(function(data) {
      //     res.tell(data);
      //   })
      //   .catch(function(err) {
      //     console.error('POST failed: ', err);
      //   });

      if (!session.user.accessToken) {
        var speechOutput = "To start using this skill, please use the \
          companion app to authenticate with Amazon."
        return res.tellWithCard(speechOutput, 'LinkAccount');
      }

      var amznProfileUrl = 'https://api.amazon.com/user/profile?access_token=' 
        + session.user.accessToken;
      
      rp(amznProfileUrl)
        .then(function(data) {
          res.tell(data);
        })
        .catch(function(err) {
          res.tell(err);
        });

      console.log('here is token!', session.user.accessToken);
    },

    "AMAZON.HelpIntent": function (intent, session, res) {
      var speechOutput = "You can say things like, Alex is home, what are Alex chores, Alex \
        finished sweeping, or, you can say exit... Now, what can I help you with?";
      res.ask(speechOutput, speechOutput);
    },

    "AMAZON.StopIntent": function (intent, session, res) {
      var speechOutput = "Okay.";
      res.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, res) {
      var speechOutput = "Okay.";
      res.tell(speechOutput);
    }
  }
};

module.exports = registerIntentHandlers;
