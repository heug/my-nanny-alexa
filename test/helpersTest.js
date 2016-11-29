var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var helpers = require('../modules/helpers');

var user = {
  amazonId: null,
  email: 'eugene.choe@gmail.com',
  id: 1,
  phone: '9173925602',
  timeZone: '',
  token: null,
  username: 'Eugene Choe',
  children: [{
    accountId: 1,
    id: 1,
    name: 'Robert',
    phone: '4159105695',
    schedule: null,
    chores: [{
      childId: 1,
      completed: false,
      date: '2016-11-20',
      details: 'Norwegian taxes are criminal',
      id: 6,
      title: 'Buy candy at duty free'
    }, {
      childId: 1,
      completed: true,
      date: '2016-11-20',
      details: 'There\'s fresh snow outside',
      id: 7,
      title: 'Go for a ski'
    }, {
      childId: 1,
      completed: false,
      date: '2016-11-20',
      details: 'Norwegian winters are fantastic',
      id: 8,
      title: 'Enjoy the two hours of daylight'
    }]
  }, {
    accountId: 1,
    id: 2,
    name: 'Meredith',
    phone: '6462709704',
    schedule: null,
    chores: [{
        childId: 2,
        completed: true,
        date: '2016-11-29',
        details: 'Download from the pirate bay',
        id: 14,
        title: 'Watch Mary Poppins'
      }, {
        childId: 2,
        completed: false,
        date: '',
        details: 'Get a black one',
        id: 16,
        title: 'Adopt a cat'
      }],
  }],
};

describe('Helpers', function() {
  describe('getUsersChild', function() {

    it('should return user object if name match', function(done) {
      var child = helpers.getUsersChild(user, 'Robert');
      expect(child.id).to.equal(1);
      expect(child.name).to.equal('Robert');
      expect(child.phone).to.equal('4159105695');
      done();
    });

    it('should return undefined if no name matches', function(done) {
      var child = helpers.getUsersChild(user, 'Harley Quinn');
      expect(child).to.equal(undefined);
      done();
    });

    it('should handle string object input', function(done) {
      var child = helpers.getUsersChild(JSON.stringify(user), 'Robert');
      expect(child.id).to.equal(1);
      expect(child.name).to.equal('Robert');
      expect(child.phone).to.equal('4159105695');
      done();
    })
  });

  describe('choresToString', function() {
    it('should return empty string for empty list', function(done) {
      var speech = helpers.choresToString([]);
      expect(speech).to.equal('');
      done();
    });

    it('should return correct string for one chore', function(done) {
      var speech = helpers.choresToString([
        user.children[0].chores[0]
      ]);

      expect(speech).to.equal('1: Buy candy at duty free... ');
      done();
    });

    it('should return correct string for two chores', function(done) {
      var speech = helpers.choresToString([
        user.children[0].chores[0],
        user.children[0].chores[1]
      ]);

      expect(speech).to.equal('1: Buy candy at duty free... and ' +
                              '2: Go for a ski... ');
      done();
    });

    it('should return correct string for tree chores', function(done) {
      var speech = helpers.choresToString(user.children[0].chores);

      expect(speech).to.equal('1: Buy candy at duty free... ' +
                              '2: Go for a ski... and ' + 
                              '3: Enjoy the two hours of daylight... ');
      done();
    });
  });
});