var chai = require('chai');
var expect = chai.expect;

var mock = require('mock-require');

var getIntent = function(intentName) {
  var registerIntentHandlers = require('../handlers/intentHandlers');
  var intentHandler = registerIntentHandlers(function() {}).prototype
                                                           .intentHandlers;
  return intentHandler[intentName];  
};

describe('IntentHandlers', function() {

  describe('CheckInIntent', function() {

    var intent = {};
    var user = {
      accessToken = '1234'
    };
    var session = {
      user: user
    };
  
    it('should exist', function(done) {
      var checkInIntent = getIntent('CheckInIntent');
      expect(checkInIntent).to.be.a('function');
      done();
    });

    describe('Successful request', function() {
      mock('request-promise', function(obj) {
        return Promise.resolve(user);
      });

      it('should return message when name is not recognized', function(done) {

      });


    });

    describe('Unsuccessful request', function() {
      mock('request-promise', function(obj) {
        return Promise.reject('error');
      });
      
      it('should return error if api lookup fails', function(done) {

        var checkInIntent = getIntent('CheckInIntent');

        checkInIntent(intent, session, {
          tell: function(data) {
            expect(data).to.equal('error');
            done();
          }
        });
      });
    });
  });
});
  