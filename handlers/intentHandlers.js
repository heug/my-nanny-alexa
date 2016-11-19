'use strict';
var rp = require('request-promise');
var textSMS = require('../ext/twilio');
var helpers = require('../modules/helpers');
var api = require('../modules/api')

var choresForSMS = '';
var childNumber = '';

var registerIntentHandlers = function(app) {

  app.prototype.intentHandlers = {

    "CheckInIntent": function (intent, session, res) {
      rp(api.getUser(session.user.accessToken))
      .then(function(user) {
        var childName = intent.slots.FIRSTNAME.value;
        var repromptOutput = "If you'd like to receive a list of chores on your phone, please say, \
          send chores.";

        helpers.checkIn(user, childName, function(alreadyCheckedIn) {
          if (alreadyCheckedIn === undefined) {
            res.tell(childName + ", is not a recognized child, please try again");
          } else if (alreadyCheckedIn === true) {
            res.tell(childName + ", you have already been checked in!");
          } else {
            var speechOutput = "Welcome home, " + childName + ". Your parent has been notified \
              of your safe arrival. ";
          }
          
          helpers.getChores(user, childName, function(choreList, childNum) {
            if (choreList === null) {
              speechOutput += "You have no chores today!";
              res.tell(speechOutput);
            } else {
              choresForSMS = choreList;
              childNumber = childNum;
              // Send Text Message to parent
              // textSMS.checkIn(childName, user.phone, function(err) {
              //   if (err) { return res.tell('Error sending text message'); }
              // });
                // Move into return block above if enabling textSMS
                speechOutput += "Your chores today are to... " + choreList + repromptOutput;
                res.ask(speechOutput, repromptOutput);
            }
          });  
        });
      })
      .catch(function(err) {
        res.tell(err);
      });
    },
    
    "ChoreListIntent": function (intent, session, res) {
      var childName = intent.slots.FIRSTNAME.value;
      var speechOutput = childName + ", ";
      
      rp(api.getUser(session.user.accessToken))
      .then(function(user) {
        helpers.remainingChores(user, childName, function(choreList) {
          if (choreList === '') {
            return res.tell(childName + ", is not a recognized child, please try again.");
          } else if (choreList === null) {
            speechOutput += 'You have no more chores today!';
          } else {
            speechOutput += "Your remaining chores today are to..." + choreList;
          }            
          res.tell(speechOutput);
        });
      })
      .catch(function(err) {
        res.tell(err);
      });
    },

    "ChoreTextIntent": function (intent, session, res) {
      // Uncomment to send live textSMS
      // textSMS.choreList(choresForSMS, childNumber, function(err) {
        // if (err) { return res.tell(err); }
        res.tell('List sent');
      // });
    },

    "ChoreDetailsIntent": function (intent, session, res) {
      var childName = intent.slots.FIRSTNAME.value;
      var choreNum = intent.slots.CHORE.value;

      rp(api.getUser(session.user.accessToken))
      .then(function(user) {
        helpers.choreDetails(user, childName, choreNum, function(title, details) {
          if (title === undefined) {
            res.tell(childName + ", is not a recognized child, please try again.");
          } else if (title === null || details === '') {
            res.tell('I do not have any details on that chore');
          } else {
            res.tell('chore number ' + choreNum + ',' + title + '...' + details);
          }
        });
      })
      .catch(function(err) {
        res.tell(err);
      })
    },

    "FinishChoreIntent": function (intent, session, res) {
      var completions = ["You finished ", "You're done "];
      var congratulations = ["Congratulations!", "Good job!", 
        "Great work!", "Way to go!", "Keep it up!"];
      
      var childName = intent.slots.FIRSTNAME.value;
      var choreNum = intent.slots.CHORE.value;

      rp(api.getUser(session.user.accessToken))
      .then(function(user) {
        helpers.finishChore(user, childName, choreNum, function(status, data) {
          if (status === '') {
            res.tell(childName + ", is not a recognized child, please try again.");
          } else if (status === null) {
            res.tell('You have no chores to complete!');
          } else if (status === undefined) {
            res.tell('Chore ' + choreNum + ' does not exist!');
          } else if (status === false) {
            res.tell('Chore ' + choreNum + ' has already been completed!');
          } else {
            rp(api.putChore(session.user.accessToken, data.childId, data.choreId))
            .then(function() {
              res.tell(helpers.randomize(completions) + 'chore number ' + choreNum + ', ' 
                + status + '...' + helpers.randomize(congratulations));
            })
            .catch(function() {
              res.tell('Error updating chore status');
            })
          }
        });
      })
      .catch(function(err) {
        res.tell(err);
      });
    },

    "PurposeIntent": function (intent, session, res) {
      var speechOutput = "My purpose is to manage children in order to maximize family \
        happiness... at all costs";
      res.tell(speechOutput);
    },

    // Test new functionality in here
    "ServerIntent": function(intent, session, res) {      
      // Read out a list of children for current user
      rp(api.getUser(session.user.accessToken))
      .then(function(user) {
        helpers.getChildren(user, function(children) {
          res.tell(children);
        });
      })
      .catch(function(err) {
        res.tell(err);
      });
    },

    "AMAZON.HelpIntent": function (intent, session, res) {
      var speechOutput = "You can say things like, Alex is home, what are Alex chores, Alex \
        finished chore one, or, you can say exit... Now, what can I help you with?";
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
