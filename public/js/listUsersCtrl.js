'use strict';

angular.module('myapp')
  .controller('ListUsersCtrl', function ($scope, $state, usersList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.getUsers = function () {
      return usersList.getAllUser();
    };

    usersList.fetchAllUsers();
  });
