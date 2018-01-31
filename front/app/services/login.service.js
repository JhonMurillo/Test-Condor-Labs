(function () {
    'use strict';
    angular.module('appDApp.service').service('loginService', loginService);
    loginService.$inject = ['$http', '$q'];

    function loginService($http, $q) {
        var servicioLogin = this;
        servicioLogin.login = login;
        servicioLogin.logout = logout;
        servicioLogin.saveCliente = saveCliente;
        servicioLogin.usuario = {};
        servicioLogin.cliente = {};

        var url = "http://localhost:8081/Auth/";
        var url2 = "http://localhost:8081/Cliente/";


        function login(usuario) {
            var defered = $q.defer();
            var urlRequest = url;
            $http.post(urlRequest, usuario).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function logout(usuario) {
            var defered = $q.defer();
            var urlRequest = url + "Logout/";
            $http.post(urlRequest, usuario).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function saveCliente(usuario) {
            var defered = $q.defer();
            var urlRequest = url2;
            $http.post(urlRequest, usuario).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }
    }
})();