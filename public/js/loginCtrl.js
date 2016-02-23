'use strict';

angular.module('myapp')
  .controller('LogInCtrl', function ($scope, $state, user) {
    if (user.currentUser.loggedIn) {
      $state.go('home');
    }

    $scope.userLogin = function () {

      var handleResponse = function (response) {
        if (response.status === 200) {
          user.setUserValues(response.data, true);
          $state.go('home');
        } else {
          $scope.Error = response.data;
        }
      };

      user.loginUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
