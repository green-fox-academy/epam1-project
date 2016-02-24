'use strict';

angular.module('myapp')
  .factory('user', function ($http) {
    var currentUser = {
      isAuthenticated: false,
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

    function isAdmin() {
      return currentUser.admin;
    }

    function isAuthenticated() {
      return currentUser.isAuthenticated;
    }

    function setAuthenticated() {
      currentUser.isAuthenticated = true;
    }

    function getEmail() {
      return currentUser.email;
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

    function authenticateUser(done) {
      $http.get('/api/user').then(function (response) {
        if (response.status === 200) {
          setUserValues(response.data, true);
        }

        setAuthenticated();
        done();
      });
    }

    return {
      setUserValues: setUserValues,
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      isAuthenticated: isAuthenticated,
      authenticateUser: authenticateUser,
      getEmail: getEmail,
      addNewUser: addNewUser,
      loginUser: loginUser,
      logoutUser: logoutUser,
    };
  });
