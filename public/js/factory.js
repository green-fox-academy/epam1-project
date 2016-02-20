'use strict';

angular.module('myapp').factory('users', function ($http) {
  var url = '/api/register';

  function addNewUser(newUser, handleResponse) {
    $http.post(url, newUser).then(function (response) {
      handleResponse(response);

    }, function (error) {

      handleResponse(error);
    });
  }

  return {
    addNewUser: addNewUser,
  };
});
