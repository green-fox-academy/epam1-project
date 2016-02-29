'use strict';

angular.module('myapp')
  .controller('FrontpageCtrl', function ($scope, $state, usersList, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }
  });
