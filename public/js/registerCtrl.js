'use strict';

angular.module('myapp')
  .controller('RegisterCtrl', function ($scope, $state, usersList) {
    $scope.addUser = function () {
      var handleResponse = function (response) {
        if (response.status === 200) {
          $state.go('home');
        } else {
          $scope.Error = response.statusText;
        }
      };

      usersList.addNewUser({
        email: $scope.email,
        password: $scope.password,
      }, handleResponse);
    };
  });
