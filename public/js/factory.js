'use strict';

var myapp = angular.module('myapp');

myapp.factory('users', function ($http, $state) {
  var url = '/api/register';

  function addNewUser(newUser) {
    $http.post(url, newUser).then(function () {
      $state.go('home');
    }, function (error) {

      console.log(error);
    });
  }

  return {
    addNewUser: addNewUser,
  };
});
