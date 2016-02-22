'use strict';

angular.module('myapp')
  .controller('SubmitCtrl', function ($scope, $state, users) {
    $scope.addUser = function () {
      var user = {
        email: $scope.email,
        password: $scope.password,
      };

      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('home');
        } else {
          $scope.Error = response.statusText;
        }
      };

      users.addNewUser(user, handleResponse);
    };
  });
