'use strict';

angular.module('myapp')
  .factory('user', function ($http) {

    var currentUser = {
      isAuthenticated: false,
      email: '',
      isAdmin: false,
      isLoggedIn: false,
    };

    function setUserValues(values, isLoggedIn) {
      currentUser.email = values.email;
      currentUser.isAdmin = values.admin;
      currentUser.isLoggedIn = isLoggedIn;
    }

    function resetUser() {
      setUserValues({
        email: '',
        isAdmin: false,
      },
      false);
    }

    function isAuthenticated() {
      return currentUser.isAuthenticated;
    }

    function isAdmin() {
      return currentUser.isAdmin;
    }

    function isLoggedIn() {
      return currentUser.isLoggedIn;
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
        } else {
          resetUser();
        }

        setAuthenticated();
        done();
      });
    }

    return {
      setUserValues: setUserValues,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin,
      isLoggedIn: isLoggedIn,
      getEmail: getEmail,
      authenticateUser: authenticateUser,
      addNewUser: addNewUser,
      loginUser: loginUser,
      logoutUser: logoutUser,
    };
  });
