var chai = require('chai');
var expect = chai.expect;

var registerIntentHandlers = require('../handlers/intentHandlers');

describe('IntentHandlers', function() {
  var intentHandler = registerIntentHandlers(function() {}).prototype
                                                           .intentHandlers;
  describe('CheckInIntent', function() {
    var checkInIntent = intentHandler.CheckInIntent;

    var intent = {};
    var session = {
      user: {
        accessToken: '2af321gac231b1'
      }
    };
    var res = {};

    it('should exist', function(done) {
      expect(checkInIntent).to.be.a('function');
      done();
    });

  });
  
});