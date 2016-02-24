'use strict';

angular.module('myapp')
  .controller('LogInCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.userLogin = function () {

      var handleResponse = function (response) {
        if (response.status === 200) {
          user.setUserValues(response.data, true);
          $state.go('home');
        } else {
          $scope.Error = response.data;
          $scope.password = '';
        }
      };

      user.loginUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
