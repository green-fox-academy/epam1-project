'use strict';

angular.module('myapp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: './templates/frontpage.html',
        pageTitle: 'Epam@Interviewer',
        controller: 'FrontpageCtrl',
      })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
        pageTitle: 'Register',
        controller: 'RegisterCtrl',
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
        controller: 'HomeCtrl',
      })
      .state('users', {
        url: '/users',
        templateUrl: './templates/users.html',
        pageTitle: 'Users',
      });
  })
  .run(function ($rootScope, $http) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        window.document.title = toState.pageTitle;
        var logMessage = { level: 'info', toState: toState.url };
        $http.post('/api/log', logMessage);
      });
  });
