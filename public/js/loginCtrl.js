'use strict';

angular.module('myapp')
  .controller('LogInCtrl', function ($scope, $state, users) {
    $scope.userLogin = function () {

      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('home');
        } else {
          $scope.Error = response.data;
        }
      };

      users.loginUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
