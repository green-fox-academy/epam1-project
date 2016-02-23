'use strict';

angular.module('myapp')
  .controller('HomeCtrl', function ($scope, $state, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.loggedInUser = user.currentUser;
  });
