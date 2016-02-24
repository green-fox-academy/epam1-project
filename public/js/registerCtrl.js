'use strict';

angular.module('myapp')
  .controller('RegisterCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.addUser = function () {
      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('login');
        } else {
          $scope.Error = response.statusText;
          $scope.password = '';
        }
      };

      user.addNewUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
