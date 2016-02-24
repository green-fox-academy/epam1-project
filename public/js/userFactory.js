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

    function resetUser() {
      currentUser.email = '';
      currentUser.admin = false;
      currentUser.loggedIn = false;
    }

    function isLoggedIn() {
      return currentUser.loggedIn;
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

    function logoutUser(done) {
      $http.get('/api/logout').then(function () {
        resetUser();
        done(null);
      }, function (error) {

        done(error);
      });
    }

    return {
      currentUser: currentUser,
      setUserValues: setUserValues,
      isLoggedIn: isLoggedIn,
      addNewUser: addNewUser,
      loginUser: loginUser,
      logoutUser: logoutUser,
    };
  });
