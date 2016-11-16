var AlexaSkill = require('./AlexaSkill');
var APP_ID = require('./config/appId');

var addEventHandlers = require('./eventHandlers');
var addIntentHandlers = require('./intentHandlers');

var MyNanny = function () {
    AlexaSkill.call(this, APP_ID.value);
};

// Extend AlexaSkill
MyNanny.prototype = Object.create(AlexaSkill.prototype);
MyNanny.prototype.constructor = MyNanny;

addEventHandlers(MyNanny);
addIntentHandlers(MyNanny);

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MyNanny skill.
    var myNanny = new MyNanny();
    myNanny.execute(event, context);
};
