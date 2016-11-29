var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var getIntent = function(root, intentName) {
  var intentHandler = root(function() {}).prototype.intentHandlers;
  return intentHandler[intentName];  
};

var request = require('request-promise');
var helpers = require('../modules/helpers');
var BPromise = require('bluebird');

describe('IntentHandlers', function() {

  var intent = {
    slots: {
      FIRSTNAME: {
        value: 'Batman'
      }
    }
  };
  var user = {
    accessToken: '1234'
  };
  var session = {
    user: user
  };

  describe('CheckInIntent', function() {
    it('should return res with error if session is invalid', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'CheckInIntent');
      
      sinon.stub(request, 'get').returns(BPromise.reject('error'));

      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('error');
          request.get.restore();
          done();
        }
      });
    });

    it('should return voice command for unrecognized child', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'CheckInIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns(undefined);

      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('Batman, is not a recognized child, please try again');
          request.get.restore();
          helpers.getUsersChild.restore();
          done();
        }
      });
    });

    it('should return voice command with no chores if list is empty', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'CheckInIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns({
        name: 'Batman',
        chores: []
      });
      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('Welcome home, Batman. Your parent has been notified \
                           of your safe arrival. you have no chores today!');
          request.get.restore();
          helpers.getUsersChild.restore();
          done();
        }
      });
    });

    it('should return correct voice command with one chore', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'CheckInIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns({
        name: 'Batman',
        chores: [{}]
      });
      sinon.stub(helpers, 'choresToString').returns('Voice command for chores');

      checkInIntent(intent, session, {
        ask: function(data, repeat) {
          expect(data).to.equal('Welcome home, Batman. Your parent has been notified \
                           of your safe arrival. Voice command for chores');
          expect(repeat).to.equal('If you\'d like to receive a list of chores on your phone, please say, \
            send chores.');
          request.get.restore();
          helpers.getUsersChild.restore();
          helpers.choresToString.restore();
          done();
        }
      });
    });

    it('should return correct voice command with two chores', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'CheckInIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns({
        name: 'Batman',
        chores: [{}]
      });
      sinon.stub(helpers, 'choresToString').returns('Voice command for chores');

      checkInIntent(intent, session, {
        ask: function(data, repeat) {
          expect(data).to.equal('Welcome home, Batman. Your parent has been notified \
                           of your safe arrival. Voice command for chores');
          expect(repeat).to.equal('If you\'d like to receive a list of chores on your phone, please say, \
            send chores.');
          request.get.restore();
          helpers.getUsersChild.restore();
          helpers.choresToString.restore();
          done();
        }
      });
    });
  });

  describe('ChoreListIntent', function() {
    it('should return res with error if session is invalid', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'ChoreListIntent');
      
      sinon.stub(request, 'get').returns(BPromise.reject('error'));

      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('error');
          request.get.restore();
          done();
        }
      });
    });

    it('should return voice command for unrecognized child', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'ChoreListIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns(undefined);

      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('Batman, is not a recognized child, please try again');
          request.get.restore();
          helpers.getUsersChild.restore();
          done();
        }
      });
    });

    it('should return voice command for no more chores', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'ChoreListIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns({
        chores: []
      });

      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('Batman, You have no more chores today!');
          request.get.restore();
          helpers.getUsersChild.restore();
          done();
        }
      });
    });

    it('should return voice command for more chore(s)', function(done) {
      var registerIntentHandlers = require('../handlers/intentHandlers');
      var checkInIntent = getIntent(registerIntentHandlers, 'ChoreListIntent');
      
      sinon.stub(request, 'get').returns(BPromise.resolve(JSON.stringify(user)));
      sinon.stub(helpers, 'getUsersChild').returns({
        chores: [{}]
      });
      sinon.stub(helpers, 'remainingChoresToString').returns('more chores');

      checkInIntent(intent, session, {
        tell: function(data) {
          expect(data).to.equal('Batman, Your remaining chores today are...more chores');
          request.get.restore();
          helpers.getUsersChild.restore();
          helpers.remainingChoresToString.restore();
          done();
        }
      });
    });


  });
});
  