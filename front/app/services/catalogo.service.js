(function () {
    'use strict';
    angular.module('appDApp.service').service('catalogoService', catalogoService);
    catalogoService.$inject = ['$http', '$q'];

    function catalogoService($http, $q) {
        var servicioCatalogo = this;
        servicioCatalogo.buscarCatalogos = getCatalogos;
        servicioCatalogo.buscarPeliculaByCatalogo = getPeliculaByCatalogo;
        servicioCatalogo.buscarCatalogoByid = getCatalogoById;
        servicioCatalogo.agregarCatalogo = postCatalogo;
        servicioCatalogo.actualizarCatalogo = putCatalogo;
        servicioCatalogo.eliminarCatalogo = deleteCatalogo;
        servicioCatalogo.catalogo = {};

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

        function getCatalogos(estado) {
            var urlRequest = url + "Catalogo/findByEstado/" + estado;
            return ejecutarServicesGet(urlRequest);
        }

        function getPeliculaByCatalogo(idCatalogo) {
            var urlRequest = url + "CatalogoPelicula/findByIdCatalogo/" + idCatalogo;
            return ejecutarServicesGet(urlRequest);
        }



        function getCatalogoById(id) {
            var urlRequest = url + 'find/' + id;
            return ejecutarServicesGet(urlRequest);
        }

        function postCatalogo(user) {
            var defered = $q.defer();
            var urlRequest = url;
            $http.post(urlRequest, user).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function putCatalogo(user) {
            var defered = $q.defer();
            var urlRequest = url + 'edit' + user.id;
            $http.put(urlRequest, user).success(function (response) {
                defered.resolve(response);
            }).error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        function deleteCatalogo(user) {
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