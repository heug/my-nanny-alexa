'use strict';
var registerEventHandlers = function(app) {
  app.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MyNanny onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
  };

  app.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MyNanny onLaunch requestId: " + launchRequest.requestId + ", sessionId: " 
      + session.sessionId);

    if (!session.user.accessToken) {
      var speechOutput = "To start using this skill, please use the \
        companion app to authenticate with Amazon."
      return response.tellWithCard(speechOutput, 'LinkAccount');
    }
    
    var speechOutput = "Nanny operational. What can I do for you?";
    var repromptText = "For instructions on what you can say, please say help me.";
    
    response.ask(speechOutput, repromptText);
  };

  app.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MyNanny onSessionEnded requestId: " + sessionEndedRequest.requestId
      + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
  };
};

module.exports = registerEventHandlers;
