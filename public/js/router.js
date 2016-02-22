'use strict';

angular.module('myapp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: './templates/frontpage.html',
        pageTitle: 'Epam@Interviewer',
      })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
        pageTitle: 'Register',
      })
      .state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        pageTitle: 'Login',
      })
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.html',
        pageTitle: 'Home',
      }
      );
  })
  .run(function ($rootScope, $http) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        window.document.title = toState.pageTitle;
        var logMessage = { level: 'info', toState: toState.url };
        $http.post('/api/log', logMessage);
      });
  });
