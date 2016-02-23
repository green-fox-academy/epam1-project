'use strict';

angular.module('myapp')
  .controller('MainCtrl', function ($scope) {
    $scope.user = {
      email: 'valaki',
      admin: true,
      loggedIn: false,
    };
  });
