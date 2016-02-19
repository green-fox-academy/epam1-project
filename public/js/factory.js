'use strict';

angular.module('myapp').factory('users', function ($http, $state) {
  var url = '/api/register';

  function addNewUser(newUser, errorCb) {
    $http.post(url, newUser).then(function () {
      $state.go('home');
    }, function (error) {

      errorCb(error);
    });
  }

  return {
    addNewUser: addNewUser,
  };
});
