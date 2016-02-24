'use strict';

angular.module('myapp')
  .run(function ($rootScope, $http, $state, user) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {

        if (!user.isAuthenticated()) {
          stopStateChange();
          user.authenticateUser(continueStateChange);
        }

        function stopStateChange() {
          event.preventDefault();
        }

        function continueStateChange() {
          $state.go(toState);
        }

      });
  });
