'use strict';

angular.module('myapp').controller('SubmitCtrl', function ($scope, users) {
  $scope.addUser = function () {
    var user = {
      email: $scope.email,
      password: $scope.password,
    };

    var errorHandler = function (error) {
      $scope.Error = error.statusText;
    };

    users.addNewUser(user, errorHandler);
  };
});
