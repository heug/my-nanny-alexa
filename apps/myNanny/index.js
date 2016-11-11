var alexa = require('alexa-app');
var Stubs = require('./stubs/index.js');

// // Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('myNanny');

// Things to do on launch ==============================================================
app.launch(function(req,res) {
  console.log("myNanny onLaunch requestId: " + launchRequest.requestId + ", sessionId: " 
    + session.sessionId);
  
  var speechOutput = "Nanny operational. What can I do for you?";
  var repromptText = "For instructions on what you can say, please say help me.";
  
  res.say(speechOutput).reprompt(repromptText).shouldEndSession(false);
});

// Intents =============================================================================
app.intent("CheckInIntent", {
  "slots": {
    "NAME": "LITERAL"
  },
  "utterances": [
    Stubs.names + "{check|checking} in",
    Stubs.names + "is {home|back}",
    Stubs.names + "has {arrived|returned}"
  ]
}, function(req, res) {
  res.say("Welcome home, " + req.slot('NAME'));
});

app.intent("ChoreListIntent", {
  "utterances": [
    "{What are|What're|What} my chores {are|} {today|}",
    "What do I have to do today",
    "{my|} {chores|chore|to do} {list}"
  ]
}, function(req, res) {
  var chores = ["Wash the dishes", "Walk the dog", "Make your bed"];
  var speechOutput = "Your chores today are to...";
  for (var i = 0; i < chores.length; i++) {
    var and = '';
    if (i === chores.length - 1) {
      and = 'and ';
    }
    speechOutput += and + chores[i] + ',';
  };
  res.say(speechOutput);
});

app.intent("FinishChoreIntent", {
  "slots": {
    "CHORE":"LITERAL"
  },
  "utterances": [
    "{I|I'm} {finally|} {done|completed} {with|} " + Stubs.chores
  ]
}, function(req, res) {
  var completions = ["You finished ", "You're done "];
  var congratulations = ["Congratulations!", "Good job!", "Great work!", "Way to go!", "Keep it up!"]
  var randomizer = function(phrases) {
    return phrases[Math.floor(Math.random() * phrases.length)]; 
  };

  if (req.slot('CHORE')) {
    res.say(randomizer(completions) + req.slot('CHORE') + '...' + randomizer(congratulations));
  } else {
    res.say("I'm sorry, I didn't understand that. Could you please repeat that?");
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

app.intent("Hal2000Intent", {
  "utterances": [
    "Open the {pod|bay|pod bay|} doors {hal|}"
  ]
}, function(req, res) {
  var speechOutput = "I'm sorry Dave, I'm afraid I can't do that.";
  res.say(speechOutput);
}),

app.intent("AMAZON.HelpIntent", {},
  function(req, res) {
    var speechOutput = "You can say things like, I'm home, what are my chores, or, \
        you can say exit... Now, what can I help you with?";
    res.say(speechOutput);
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
})

module.exports = app;
