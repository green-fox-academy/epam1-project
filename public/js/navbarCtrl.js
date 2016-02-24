'use strict';

angular.module('myapp')
  .controller('navbarCtrl', function ($scope, $state, user) {
    $scope.user = user;
  });
