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
//            'ghiscoding.validation',
//            'pascalprecht.translate',
            'angular-growl'
        ])
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('ls')
                    .setStorageType('sessionStorage');
        })
//        .config(function ($translateProvider) {
//            $translateProvider.useStaticFilesLoader({
//                prefix: '/bower_components/angular-validation-ghiscoding/locales/validation/',
//                suffix: '.json'
//            });
//            $translateProvider.preferredLanguage('es').fallbackLanguage('es');
//            $translateProvider.useSanitizeValueStrategy('escapeParameters');
//        })
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/misreservas', {
                        templateUrl: 'views/mis-reservas.html'
                    })
                    .when('/reserva', {
                        templateUrl: 'views/reserva.html'
                    })
                    .when('/catalogo', {
                        templateUrl: 'views/catalogo.html'
                    })
                    .when('/user', {
                        templateUrl: 'views/user.html'
                    })
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        controllerAs: 'main'
                    })
                    .when('/about', {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl',
                        controllerAs: 'about'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        }).config(function ($authProvider) {

    // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
    $authProvider.facebook({
        clientId: '1747244845531175'
    });
    $authProvider.google({
        clientId: 'Google Client ID'
    });
    $authProvider.github({
        clientId: 'GitHub Client ID'
    });
    $authProvider.linkedin({
        clientId: 'LinkedIn Client ID'
    });
    $authProvider.instagram({
        clientId: 'Instagram Client ID'
    });
    $authProvider.yahoo({
        clientId: 'Yahoo Client ID / Consumer Key'
    });
    $authProvider.live({
        clientId: 'Microsoft Client ID'
    });
    $authProvider.twitch({
        clientId: 'Twitch Client ID'
    });
    $authProvider.bitbucket({
        clientId: 'Bitbucket Client ID'
    });
    // No additional setup required for Twitter

    $authProvider.oauth2({
        name: 'foursquare',
        url: '/auth/foursquare',
        clientId: 'Foursquare Client ID',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });
    $authProvider.httpInterceptor = function () {
        return true;
    },
            $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';
// Facebook
    $authProvider.facebook({
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        type: '2.0',
        popupOptions: {width: 580, height: 400}
    });
// Google
    $authProvider.google({
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: {width: 452, height: 633}
    });
// GitHub
    $authProvider.github({
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin,
        optionalUrlParams: ['scope'],
        scope: ['user:email'],
        scopeDelimiter: ' ',
        type: '2.0',
        popupOptions: {width: 1020, height: 618}
    });
// Instagram
    $authProvider.instagram({
        name: 'instagram',
        url: '/auth/instagram',
        authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        scope: ['basic'],
        scopeDelimiter: '+',
        type: '2.0'
    });
// LinkedIn
    $authProvider.linkedin({
        url: '/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        redirectUri: window.location.origin,
        requiredUrlParams: ['state'],
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        state: 'STATE',
        type: '2.0',
        popupOptions: {width: 527, height: 582}
    });
// Twitter
    $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin,
        type: '1.0',
        popupOptions: {width: 495, height: 645}
    });
// Twitch
    $authProvider.twitch({
        url: '/auth/twitch',
        authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        scope: ['user_read'],
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: {width: 500, height: 560}
    });
// Windows Live
    $authProvider.live({
        url: '/auth/live',
        authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
        redirectUri: window.location.origin,
        requiredUrlParams: ['display', 'scope'],
        scope: ['wl.emails'],
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: {width: 500, height: 560}
    });
// Yahoo
    $authProvider.yahoo({
        url: '/auth/yahoo',
        authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
        redirectUri: window.location.origin,
        scope: [],
        scopeDelimiter: ',',
        type: '2.0',
        popupOptions: {width: 559, height: 519}
    });
// Bitbucket
    $authProvider.bitbucket({
        url: '/auth/bitbucket',
        authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
        redirectUri: window.location.origin + '/',
        optionalUrlParams: ['scope'],
        scope: ['email'],
        scopeDelimiter: ' ',
        type: '2.0',
        popupOptions: {width: 1020, height: 618}
    });
// Generic OAuth 2.0
    $authProvider.oauth2({
        name: null,
        url: null,
        clientId: null,
        redirectUri: null,
        authorizationEndpoint: null,
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        requiredUrlParams: null,
        optionalUrlParams: null,
        scope: null,
        scopePrefix: null,
        scopeDelimiter: null,
        state: null,
        type: null,
        popupOptions: null,
        responseType: 'code',
        responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
        }
    });
// Generic OAuth 1.0
    $authProvider.oauth1({
        name: null,
        url: null,
        authorizationEndpoint: null,
        redirectUri: null,
        type: null,
        popupOptions: null
    });
});


