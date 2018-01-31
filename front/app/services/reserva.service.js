(function () {
    'use strict';
    angular.module('appDApp.service').service('reservaService', reservaService);
    reservaService.$inject = ['$http', '$q'];

    function reservaService($http, $q) {
        var servicioReserva = this;
        servicioReserva.buscarReservas = getReservas;
        servicioReserva.buscarMisReservas = getMisReservas;
        servicioReserva.buscarPeliculas = getPeliculas;
        servicioReserva.buscarPeliculaByReserva = getPeliculaByReserva;
        servicioReserva.buscarReservaByid = getReservaById;
        servicioReserva.agregarReserva = postReserva;
        servicioReserva.actualizarReserva = putReserva;
        servicioReserva.eliminarReserva = deleteReserva;
        servicioReserva.reserva = {};

        var url = "http://localhost:8081/";

        function ejecutarServicesGet(urlRequest) {
            var defered = $q.defer();
            $http.get(urlRequest).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function getReservas(estado) {
            var urlRequest = url + "Reserva/findByEstado/" + estado;
            return ejecutarServicesGet(urlRequest);
        }

        function getMisReservas(idCliente, estado) {
            var urlRequest = url + "Reserva/findByIdCliente/" + idCliente + "/" + estado;
            return ejecutarServicesGet(urlRequest);
        }

        function getPeliculas() {
            var urlRequest = url + "Pelicula";
            return ejecutarServicesGet(urlRequest);
        }

        function getPeliculaByReserva(idReserva) {
            var urlRequest = url + "ReservaPelicula/findByIdReserva/" + idReserva;
            return ejecutarServicesGet(urlRequest);
        }



        function getReservaById(id) {
            var urlRequest = url + 'find/' + id;
            return ejecutarServicesGet(urlRequest);
        }

        function postReserva(reserva) {
            var defered = $q.defer();
            var urlRequest = url + "Reserva";
            $http.post(urlRequest, reserva).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function putReserva(user) {
            var defered = $q.defer();
            var urlRequest = url + 'edit' + user.id;
            $http.put(urlRequest, user).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function deleteReserva(user) {
            var defered = $q.defer();
            var urlRequest = url + 'delete/' + user.id;
            $http.delete(urlRequest).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }
    }
})();