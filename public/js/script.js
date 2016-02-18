'use strict';

var myapp = angular.module('myapp', ['ui.router']);

myapp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('frontpage', {
      url: '/',
      templateUrl: '../templates/frontpage.html',
    })
    .state('register', {
      url: '/register',
      templateUrl: '../templates/register.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: '../templates/login.html',
    })
    .state('home', {
      url: '/home',
      templateUrl: '../templates/home.html',
    });
});

myapp.factory('users', function ($http, $state) {
  var url = '/api/register';

  function addNewUser(newUser) {
    $http.post(url, newUser).then(function (response) {
      $state.go('home');
      console.log(response);
    }, function (error) {

      console.log(error);
    });
  }

  return {
    addNewUser: addNewUser,
  };
});

myapp.controller('SubmitCtrl', function ($scope, users) {
  $scope.addUser = function () {
    var user = {
      email: $scope.email,
      password: $scope.password,
    };
    users.addNewUser(user);
  };
});
