'use strict';

var myapp = angular.module('myapp', ['ui.router']);

myapp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('frontpage', {
      url: '/',
      templateUrl: "../templates/index.html"
    })

    .state('register', {
      url: '/register',
      templateUrl: "../templates/register.html"
    })
    .state('login', {
      url: '/login',
      templateUrl: "../templates/login.html"
    });
});
