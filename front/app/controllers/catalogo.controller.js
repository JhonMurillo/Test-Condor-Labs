(function () {
    'use strict';
    angular.module('appDApp').controller('CatalogoCtrl', CatalogoCtrl);
    CatalogoCtrl.$inject = ['$scope', 'catalogoService'];
    function CatalogoCtrl($scope, catalogoService) {
        var catalogoCtrl = this;
        catalogoCtrl.catalogoCtrl = catalogoService.catalogo;
        catalogoCtrl.listaCatalogos = [];
        catalogoCtrl.listaPeliculas = [];

        catalogoCtrl.onFindCatalogo = function () {
            swal({
                title: "Cargando Datos...",
                imageUrl: "images/cargando.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            var estado = "ACTIVO";
            catalogoService.buscarCatalogos(estado).then(function (data) {
                catalogoCtrl.listaCatalogos = data;
                swal.close();
            }).catch(function (e) {
                swal({
                    title: "Error",
                    text: "Presentamos inconvenientes en el sistema, comunícate con el administrador de la plataforma.",
                    type: "error",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    confirmButtonText: "Aceptar",
                    timer: 5000
                });
                return;
            });
        };

        catalogoCtrl.onVerPeliculas = function (item) {
            catalogoService.buscarPeliculaByCatalogo(item.id).then(function (data) {
                catalogoCtrl.listaPeliculas = data;
                $("#myModal").modal("show");
            });
        };

        catalogoCtrl.onFindCatalogo();
    }
})();


