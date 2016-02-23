'use strict';

angular.module('myapp')
  .factory('user', function ($http) {

    function addNewUser(newUser, handleResponse) {
      $http.post('/api/register', newUser).then(function (response) {
        handleResponse(response);

      }, function (error) {

        handleResponse(error);
      });
    }

    function loginUser(user, handleResponse) {
      $http.post('/api/login', user).then(function (response) {
        handleResponse(response);
      }, function (error) {

        handleResponse(error);
      });
    }

    return {
      addNewUser: addNewUser,
      loginUser: loginUser,
    };
  });
