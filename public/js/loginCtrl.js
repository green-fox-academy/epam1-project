'use strict';

angular.module('myapp')
  .controller('LogInCtrl', function ($scope, $state, usersList) {
    $scope.userLogin = function () {

      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('home');
        } else {
          $scope.Error = response.data;
        }
      };

      usersList.loginUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
