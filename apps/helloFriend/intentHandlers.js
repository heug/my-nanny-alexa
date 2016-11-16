'use strict';

module.change_code = 1;

var registerIntentHandlers = function(app) {

  app.launch(function(req, res) {
    
    var speechOutput = "Hello and well met, fellow traveller";
    var repromptText = "For instructions on what you can say, please say Omar needs help.";
    
    res.say(speechOutput).reprompt(repromptText).shouldEndSession(false);
  });


  app.intent("HelloFriendIntent", {
    "utterances": [
      "Hello"
    ]
  }, function(req, res) {
    var speechOutput = "What up young G";
    res.say(speechOutput).shouldEndSession(false).send();

    return;
  });

  app.sessionEnded(function(req, res) {
    logout(req.userId);
    // No response necessary
  });

};

module.exports = registerIntentHandlers;
