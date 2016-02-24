'use strict';

angular.module('myapp')
  .controller('NavbarCtrl', function ($scope, $state, user) {
    $scope.user = user;
  });
