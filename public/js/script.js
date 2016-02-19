'use strict';

angular.module('myapp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: './templates/frontpage.html',
      })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
      })
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.html',
      }
      );
  });
