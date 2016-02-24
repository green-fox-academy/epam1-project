'use strict';

angular.module('myapp')
  .controller('NavbarCtrl', function ($scope, $state, user) {
    $scope.user = user;

    $scope.logoutUser = function () {
      user.logoutUser(whenLogout);
    };

    function whenLogout(error) {
      if (error) {
        window.alert(error.data);
      } else {
        $state.go('frontpage');
      }
    }
  });
