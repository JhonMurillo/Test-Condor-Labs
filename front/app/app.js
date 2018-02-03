'use strict';

/**
 * @ngdoc overview
 * @name appDApp
 * @description
 * # appDApp
 *
 * Main module of the application.
 */
angular
        .module('appDApp', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'satellizer',
            'appDApp.service',
            'appDApp.directive',
            'objectTable',
            'LocalStorageModule',
            'angular-growl'
        ])
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('ls')
                    .setStorageType('sessionStorage');
        })
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/log.html'
                    })
                    .when('/chart', {
                        templateUrl: 'views/chart.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });



