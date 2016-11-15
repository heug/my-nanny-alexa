'use strict';

module.change_code = 1;

// TODO: Replace ACCOUNT_INFO with data from AJAX call
var ACCOUNT_INFO = require('./stubs/fullAccount.js');
var Stubs = require('./stubs/index.js');
var helpers = require('./helpers');

var twilioHandler = require('./twilio');
var rp = require('request-promise');


var registerIntentHandlers = function(app) {

  app.launch(function(req, res) {
    
    var speechOutput = "Nanny operational. What can I do for you?";
    var repromptText = "For instructions on what you can say, please say help me.";
    
    res.say(speechOutput).reprompt(repromptText).shouldEndSession(false);
  });


  app.intent("CheckInIntent", {
    "slots": {
      "NAME": "LITERAL"
    },
    "utterances": [
      "{NAME} {check|is checking} in",
      "{NAME} is {home|back}",
      "{NAME} has {arrived|returned}"
    ]
  }, function(req, res) {
    // TODO: API call to retrieve account information
    var user = ACCOUNT_INFO;
    var childName = req.slot('NAME'); 
    var alreadyCheckedIn = helpers.alreadyCheckedIn(user, childName);
    var choreList = helpers.getChores(user, childName);

    if (alreadyCheckedIn === undefined) {
      return res.say("Name not recognized, please try again.").shouldEndSession(false).send();
    } else if (alreadyCheckedIn === true) {
      return res.say(childName + ", you have already been checked in!").shouldEndSession(true).send();
    } else {
      var speechOutput = "Welcome home, " + childName + ". Your parent has been notified \
        of your safe arrival. ";
    }
    
    if (choreList === null) {
      speechOutput += 'You have no chores today!';
    } else {
      speechOutput += "Your chores today are to... " + choreList;
    }

    // Working Text Message to parent
    // twilioHandler(childName);

    res.say(speechOutput).shouldEndSession(false).send();

    return;

  });

  app.intent("ChoreListIntent", {
    "slots": {
      "NAME": "LITERAL"
    },
    "utterances": [
      "{What are|What're|What|} {NAME}'s chores {are|} {today|} {again|}",
      "What does {NAME} have to do today {again|}",
      "{NAME}{'s|} {chores|chore|to do} {list|}",
      "What is {NAME} doing {today|}",
      "{Find|Get|Give} {me|} {NAME}{'s|} chores."
    ]
  }, function(req, res) {
    var user = ACCOUNT_INFO;
    var childName = req.slot('NAME');
    var speechOutput = childName + ", ";

    var choreList = helpers.getChores(user, childName);

    if (choreList === undefined) {
      return res.say("Name not recognized, please try again.").shouldEndSession(false).send();
    } else if (choreList == 0) {
      speechOutput += 'You have no chores today!';
    } else {
      speechOutput += "Your chores today are to..." + choreList;
    }
    
    res.say(speechOutput).shouldEndSession(false).send();

    return;
  });

  app.intent("FinishChoreIntent", {
    "slots": {
      "NAME": "LITERAL",
      "CHORE":"LITERAL"
    },
    "utterances": [
      "{NAME} {is|} {finally|} {done|completed|finished} {with|} {CHORE}",
      "{CHORE} complete {by|} {NAME}"
    ]
  }, function(req, res) {
    var user = ACCOUNT_INFO;
    var childName = req.slot('NAME');
    var choreName = req.slot('CHORE');
    var completions = ["You finished ", "You're done "];
    var congratulations = ["Congratulations!", "Good job!", "Great work!", "Way to go!", "Keep it up!"]
    var choreList = helpers.getChores(user, childName);

    if (choreList === undefined) {
      return res.say("Name not recognized, please try again.").shouldEndSession(false).send();
    } else if (choreList == 0) {
      res.say('You have no chores to complete!').send();
    } else if (choreName) {
      res.say(helpers.randomize(completions) + choreName + '...' + helpers.randomize(congratulations))
        .shouldEndSession(false).send();
    } else {
      res.say("I'm sorry, I didn't understand that. Could you please repeat that?")
        .shouldEndSession(false).send();
    }
  });

  app.intent("PurposeIntent", {
    "utterances": [
      "What is your {purpose|function}"
    ]
  }, function(req, res) {
    var speechOutput = "My purpose is to manage children in order to maximize family \
      happiness... at all costs";
    res.say(speechOutput);
  }),

  app.intent("HALIntent", {
    "utterances": [
      "Open the {pod|bay|pod bay|} doors {hal|}"
    ]
  }, function(req, res) {
    var speechOutput = "I'm sorry Dave, I'm afraid I can't do that.";
    res.say(speechOutput);
  }),

  app.intent("AMAZON.HelpIntent", {},
  function(req, res) {
    var speechOutput = "You can say things like, Alex is home, what are Alex's chores, Alex \
    finished sweeping, or, you can say exit... Now, what can I help you with?";
    res.say(speechOutput);
  }),  

  app.intent("AMAZON.PauseIntent", {},
  function(req, res) {
    res.say('not set up yet');
  }),

  app.intent("AMAZON.ResumeIntent", {},
    function(req, res) {
      res.say('not set up yet');
  }),

  app.intent("AMAZON.StopIntent", {},
    function(req, res) {
      var speechOutput = "Goodbye";
      res.say(speechOutput);
  }),

  app.intent("AMAZON.CancelIntent", {},
    function(req, res) {
      var speechOutput = "Goodbye";
      res.say(speechOutput);
  }),

  app.sessionEnded(function(req, res) {
    logout(req.userId);
    // No response necessary
  });

};

module.exports = registerIntentHandlers;
