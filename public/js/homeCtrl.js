'use strict';

angular.module('myapp')
  .controller('HomeCtrl', function ($scope, $state, user) {
    if (!user.currentUser.loggedIn) {
      $state.go('login');
    }

    $scope.loggedInUser = user.currentUser;
  });
