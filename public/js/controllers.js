'use strict';

var myapp = angular.module('myapp');

myapp.controller('SubmitCtrl', function ($scope, users) {
  $scope.addUser = function () {
    var user = {
      email: $scope.email,
      password: $scope.password,
    };
    users.addNewUser(user);
  };
});
