'use strict';

// TODO: Replace ACCOUNT_INFO with data from AJAX call
var ACCOUNT_INFO = require('./stubs/fullAccount.js');
var helpers = require('./helpers');

var twilioHandler = require('./twilio');
var rp = require('request-promise');
// var Promise = require('bluebird');

var registerIntentHandlers = function(app) {

  app.prototype.intentHandlers = {

    "CheckInIntent": function (intent, session, res) {
      // TODO: API call to retrieve account information
      var user = ACCOUNT_INFO;
      var childName = intent.slots.FIRSTNAME.value;
      
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
            speechOutput += 'You have no chores today!';
          } else {
            speechOutput += "Your chores today are to... " + choreList;
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
      
      helpers.getChores(user, childName, function(choreList) {
        if (choreList === '') {
          return res.tell(childName + ", is not a recognized child, please try again.");
        } else if (choreList === null) {
          speechOutput += 'You have no chores today!';
        } else {
          speechOutput += "Your chores today are to..." + choreList;
        }
        
        res.tell(speechOutput);
        
      });
    },

    "FinishChoreIntent": function (intent, session, res) {
      var completions = ["You finished ", "You're done "];
      var congratulations = ["Congratulations!", "Good job!", "Great work!", "Way to go!", "Keep it up!"]
      
      var user = ACCOUNT_INFO;
      var childName = intent.slots.FIRSTNAME.value;
      var choreName = intent.slots.CHORE.value;

      helpers.getChores(user, childName, function(choreList) {
        if (choreList === '') {
          res.tell(childName + ", is not a recognized child, please try again.");
        } else if (choreList === null) {
          res.tell('You have no chores to complete!');
        } else if (choreName) {
          res.tell(helpers.randomize(completions) + choreName + '...' + helpers.randomize(congratulations));
        } else {
          res.ask("I'm sorry, I didn't understand that. Could you please repeat that?");
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
      var speechOutput = "Test speech";
      res.tell(speechOutput);      
    },

    "AMAZON.HelpIntent": function (intent, session, res) {
      var speechOutput = "You can say things like, Alex is home, what are Alex chores, Alex \
        finished sweeping, or, you can say exit... Now, what can I help you with?";
      res.ask(speechOutput, speechOutput);
    },

    "AMAZON.StopIntent": function (intent, session, res) {
      var speechOutput = "Goodbye";
      res.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, res) {
      var speechOutput = "Goodbye";
      res.tell(speechOutput);
    }
  }
};

module.exports = registerIntentHandlers;
