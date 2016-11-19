'use strict';
var api = {};

api.getUser = function(token) {
  return {
    method: 'GET',
    uri: 'https://api.my-nanny.org/api/account?access_token=' + token,
    json: true
  };
};

api.putChore= function(token, childId, choreId) {
  return {
    method: 'PUT',
    uri: 'https://api.my-nanny.org/api/chores?access_token=' + token,
    body: {
      "child": {
        "id": childId
      },
      "chores": [
        {
          "id": choreId,
          "completed": true
        }
      ]
    },
    json: true
  };
};

// Use below URL for getting user info from Amazon
// var amznProfileUrl = 'https://api.amazon.com/user/profile?access_token=' 
//   + session.user.accessToken;

module.exports = api;
