(function () {
    'use strict';
    angular.module('appDApp').controller('ReservaCtrl', ReservaCtrl);
    ReservaCtrl.$inject = ['$scope', 'reservaService', 'localStorageService', '$filter'];
    function ReservaCtrl($scope, reservaService, localStorageService, $filter) {
        var reservaCtrl = this;
        reservaCtrl.reserva = reservaService.reserva;
        reservaCtrl.listaReservas = [];
        reservaCtrl.listaPeliculas = [];

        reservaCtrl.onFindReserva = function () {
            swal({
                title: "Cargando Datos...",
                imageUrl: "images/cargando.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            var estado = "ACTIVO";
            reservaService.buscarReservas(estado).then(function (data) {
                reservaCtrl.listaReservas = data;
                swal.close();
            }).catch(function (e) {
                reservaCtrl.reserva = {};
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

        reservaCtrl.onFindPeliculas = function () {
            swal({
                title: "Cargando Datos...",
                imageUrl: "images/cargando.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            reservaService.buscarPeliculas().then(function (data) {
                reservaCtrl.listaPeliculas = data;
                swal.close();
            }).catch(function (e) {
                reservaCtrl.reserva = {};
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

        reservaCtrl.onFindMisReserva = function () {
            swal({
                title: "Cargando Datos...",
                imageUrl: "images/cargando.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            var estado = "ACTIVO";
            var idCliente = localStorageService.get("usuario").usuarioLogin.id;
            reservaService.buscarMisReservas(idCliente, estado).then(function (data) {
                reservaCtrl.listaReservas = [];
                angular.forEach(data, function (value, key) {
                    var reserva = {
                        estado: value.estado,
                        fechaEntrega: value.fechaEntrega === null ? "NO ENTREGADO" : $filter('date')(value.fechaEntrega, "dd/MMM/yyyy hh:mm:ss a"),
                        fechaReserva: $filter('date')(value.fechaReserva, "dd/MMM/yyyy hh:mm:ss a"),
                        id: value.id,
                        idCliente: value.idCliente,
                        idPelicula: value.idPelicula,
                        nombreCliente: value.nombreCliente,
                        titulo: value.titulo
                    };
                    reservaCtrl.listaReservas.push(reserva);
                });
                swal.close();
            }).catch(function (e) {
                reservaCtrl.reserva = {};
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

        reservaCtrl.onConfirmacion = function (item) {
            reservaCtrl.reserva.idPelicula = item.id;
            reservaCtrl.reserva.idCliente = localStorageService.get("usuario").usuarioLogin.id;
            reservaCtrl.reserva.token = localStorageService.get("usuario").usuarioLogin.token;
            reservaCtrl.reserva.cantidad = item.cantidad;
            $("#myModal2").modal("show");
        };

        reservaCtrl.onClose = function () {
            reservaCtrl.reserva = {};
            $("#myModal2").modal("hide");
        };

        reservaCtrl.registrarReserva = function () {
            $("#myModal2").modal("hide");
            swal({
                title: "Guardando Reserva...",
                imageUrl: "images/cargando.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            reservaService.agregarReserva(reservaCtrl.reserva).then(function (data) {
                if (data.tipo === 200) {
                    reservaCtrl.onFindPeliculas();
                    swal({
                        title: "Registro Exitoso",
                        text: data.message,
                        type: "info",
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        confirmButtonText: "Aceptar",
                        timer: 5000
                    });
                } else if (data.tipo === 500) {
                    swal({
                        title: "Error",
                        text: "Presentamos inconvenientes en el sistema, comunícate con el administrador de la plataforma.",
                        type: "error",
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        confirmButtonText: "Aceptar",
                        timer: 5000
                    });
                } else {
                    swal({
                        title: "Advertencia",
                        text: data.message,
                        type: "warning",
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        confirmButtonText: "Aceptar",
                        timer: 5000
                    });
                }
                reservaCtrl.reserva = {};
            }).catch(function (e) {
                reservaCtrl.reserva = {};
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

        reservaCtrl.onFindPeliculas();
        reservaCtrl.onFindMisReserva();
    }
})();


