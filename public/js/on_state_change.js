'use strict';

angular.module('myapp')
  .run(function ($rootScope, $http) {
    var url = '/api/log';

    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams, options) {
        var logMessage = { level: 'info', toState: toState.url };
        $http.post(url, logMessage)
          .then(function (response) {
            console.log(response.data);
          });
      });
  });
