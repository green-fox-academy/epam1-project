'use strict';

var myapp = angular.module('myapp', ["ui.router"])
    myapp.config(function($stateProvider, $urlRouterProvider){

      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/")

      $stateProvider
        .state('frontpage', {
            url: "/",
            templateUrl: "templates/frontpage.html"
        })
          .state('frontpage.list', {
              url: "/list",
              templateUrl: "templates/frontpage.list.html",
              controller: function($scope){
                $scope.items = ["click to log in"];
              }
          })

        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html"
        })
          .state('register.list', {
              url: "/list",
              templateUrl: "templates/register.list.html",
              controller: function($scope){
                $scope.things = ["Click to register"];
              }
          })
    })
