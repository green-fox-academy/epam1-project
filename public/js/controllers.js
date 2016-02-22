'use strict';

angular.module('myapp')
  .controller('RegisterCtrl', function ($scope, $state, users) {
    $scope.addUser = function () {
      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('home');
        } else {
          $scope.Error = response.statusText;
        }
      };

      users.addNewUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  })
  .controller('LogInCtrl', function ($scope, $state, users) {
    $scope.userLogin = function () {

      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('home');
        } else {
          $scope.Error = response.statusText;
        }
      };

      users.loginUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
