'use strict';

angular.module('myapp')
  .factory('users', function ($http) {
    var listOfUsers = [];

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

    function getAllUser() {
      return listOfUsers;
    }

    function fetchAllUsers() {
      $http.get('/api/users').then(function (response) {
        listOfUsers = response.data;
      });
    }

    return {
      addNewUser: addNewUser,
      loginUser: loginUser,
      getAllUser: getAllUser,
      fetchAllUsers: fetchAllUsers,
    };
  });
