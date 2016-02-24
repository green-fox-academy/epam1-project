'use strict';

angular.module('myapp')
  .factory('user', function ($http) {
    var currentUser = {
      email: '',
      admin: false,
      loggedIn: false,
    };

    function setUserValues(values, isLoggedIn) {
      currentUser.email = values.email;
      currentUser.admin = values.admin;
      currentUser.loggedIn = isLoggedIn;
    }

    function isLoggedIn() {
      return currentUser.loggedIn;
    }

    function isAdmin() {
      return currentUser.admin;
    }

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
      currentUser: currentUser,
      setUserValues: setUserValues,
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      addNewUser: addNewUser,
      loginUser: loginUser,
    };
  });
