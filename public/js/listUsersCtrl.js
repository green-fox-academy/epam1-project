'use strict';

angular.module('myapp')
  .controller('ListUsersCtrl', function ($scope, usersList) {
    $scope.getUsers = function () {
      return usersList.getAllUser();
    };

    usersList.fetchAllUsers();
  });
