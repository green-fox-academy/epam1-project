'use strict';

angular.module('myapp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: './templates/frontpage.html',
        controller: 'FrontpageCtrl',
        data: {
          pageTitle: 'Epam@Interviewer',
        },
      })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
        controller: 'RegisterCtrl',
        data: {
          pageTitle: 'Register',
        },
      })
      .state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        data: {
          pageTitle: 'Login',
        },
      })
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.html',
        controller: 'HomeCtrl',
        data: {
          pageTitle: 'Home',
        },
      })
      .state('users', {
        url: '/users',
        templateUrl: './templates/users.html',
        data: {
          pageTitle: 'Users',
        },
      });
  })
  .run(function ($rootScope, $http) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        window.document.title = toState.data.pageTitle;
        var logMessage = { level: 'info', toState: toState.url };
        $http.post('/api/log', logMessage);
      });
  });
