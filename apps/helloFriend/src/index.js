/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Hello Friend to say hello"
 *  Alexa: "Hello Friend!"
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.9b33db36-7c39-4a30-b6a5-c9708c9f14bd"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * HelloFriend is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HelloFriend = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloFriend.prototype = Object.create(AlexaSkill.prototype);
HelloFriend.prototype.constructor = HelloFriend;

HelloFriend.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloFriend onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HelloFriend.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloFriend onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

HelloFriend.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloFriend onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HelloFriend.prototype.intentHandlers = {
    // register custom intent handlers
    "HelloFriendIntent": function (intent, session, response) {
        response.tellWithCard("Hello Friend!", "Hello Friend", "Hello Friend!");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloFriend skill.
    var helloFriend = new HelloFriend();
    helloFriend.execute(event, context);
};

