'use strict';

angular.module('myapp')
  .controller('ListUsersCtrl', function ($scope, users) {
    $scope.getUsers = function () {
      return users.getAllUser();
    };

    users.fetchAllUsers();
  });
