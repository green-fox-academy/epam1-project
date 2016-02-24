'use strict';

angular.module('myapp')
  .run(function ($rootScope, $http, $state, user) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        if (!user.isAuthenticated()) {
          event.preventDefault();
          $http.get('/api/user').then(function (response) {
            if (response.status === 200) {
              user.setUserValues(response.data, true);
            }

            user.setAuthenticated();
            $state.go(toState);
          });
        }
      });
  });
