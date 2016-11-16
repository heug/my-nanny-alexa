var alexa = require('alexa-app');
var addIntentHandlers = require('./intentHandlers');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define app name
var app = new alexa.app('helloFriend');

// Load Intents (speech-to-action)
addIntentHandlers(app);

module.exports = app;
