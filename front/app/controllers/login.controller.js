/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    'use strict';
    angular.module('appDApp').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$scope', 'loginService', '$location', 'localStorageService'];
    function LoginCtrl($scope, loginService, $location, localStorageService) {
        var login = this;
        login.usuario = loginService.usuario;
        login.cliente = loginService.cliente;
        login.usuario.visibleLogin = false;

        if (localStorageService.get("usuario") !== null) {
            login.usuario = localStorageService.get("usuario");
        } else {
            localStorageService.clearAll();
        }

        login.autenticar = function () {
            if ($scope.$$childTail.formLogin.$valid) {
                swal({
                    title: "Iniciando Sesion...",
//                    type: "info",
                    imageUrl: "images/cargando.gif",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false
                });
                var usuario = {
                    email: login.usuario.email,
                    contrasenhia: login.VALIDAR_STRING2(login.usuario.contrasenhia)
                };
                loginService.login(usuario).then(function (data) {
                    if (data.tipo === 200) {
                        login.usuario.visibleLogin = true;
                        login.usuario.usuarioLogin = data.object;
                        login.usuario.usuarioLogin.token = data.token;
                        login.usuario.email = null;
                        login.usuario.contrasenhia = null;
                        localStorageService.set("usuario", login.usuario);
                        $location.path("/");
                        swal.close();
                    } else if (data.tipo === 409) {
                        swal({
                            title: "Advertencia",
                            text: data.message,
                            type: "warning",
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            confirmButtonText: "Aceptar",
                            timer: 5000
                        });
                    } else {
                        swal({
                            title: "Error",
                            text: "Presentamos inconvenientes en el sistema, comunícate con el administrador de la plataforma.",
                            type: "error",
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            confirmButtonText: "Aceptar",
                            timer: 5000
                        });
                    }
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
            }
        };

        login.logout = function () {
            swal({
                title: "Cerrando Sesion...",
                imageUrl: "images/cargando.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            var usuario = {
                idCliente: login.usuario.usuarioLogin.id,
                idAccesoCliente: login.usuario.usuarioLogin.idAcessoCliente,
                token: login.usuario.usuarioLogin.token
            };
            loginService.logout(usuario).then(function (data) {
                if (data.tipo === 200) {
                    login.usuario.visibleLogin = false;
                    login.usuario.usuarioLogin = null;
                    login.usuario.email = null;
                    login.usuario.contrasenhia = null;
                    localStorageService.clearAll();
                    $location.path("/");
                    swal.close();
                } else if (data.tipo === 409) {
                    swal({
                        title: "Advertencia",
                        text: data.message,
                        type: "warning",
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        confirmButtonText: "Aceptar",
                        timer: 5000
                    });
                } else {
                    swal({
                        title: "Error",
                        text: "Presentamos inconvenientes en el sistema, comunícate con el administrador de la plataforma.",
                        type: "error",
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        confirmButtonText: "Aceptar",
                        timer: 5000
                    });
                }
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

        login.registrese = function () {
            login.cliente = {};
            $('#registrese').modal({backdrop: 'static', keyboard: false});
            $("#registrese").modal("show");
        };

        login.onClose = function () {
            login.cliente = {};
//            console.log($scope.formRegistrese.$error);
//            console.log($scope.formRegistrese);
//            $scope.formRegistrese.$error = {};
//            $scope.formRegistrese.$error = {};
//            $scope.formRegistrese.$submitted = false;
//            console.log($scope.formRegistrese.$error);
//            console.log($scope.formRegistrese);
        };

        login.registrarCliente = function () {
            if ($scope.formRegistrese.$valid) {
                swal({
                    title: "Guardando Cliente...",
                    imageUrl: "images/cargando.gif",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false
                });
                login.cliente.nombre = login.VALIDAR_STRING(login.cliente.nombre);
                login.cliente.email = login.VALIDAR_STRING2(login.cliente.email);
                login.cliente.estado = "ACTIVO";
                loginService.saveCliente(login.cliente).then(function (data) {
                    if (data.tipo === 200) {
                        login.cliente = {};
                        swal({
                            title: "Registro Exitosa",
                            text: data.message,
                            type: "info",
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            confirmButtonText: "Aceptar",
                            timer: 5000
                        });
                        $("#registrese").modal("hide");
                    } else if (data.tipo === 409) {
                        swal({
                            title: "Advertencia",
                            text: data.message,
                            type: "warning",
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            confirmButtonText: "Aceptar",
                            timer: 5000
                        });
                    } else {
                        swal({
                            title: "Error",
                            text: "Presentamos inconvenientes en el sistema, comunícate con el administrador de la plataforma.",
                            type: "error",
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            confirmButtonText: "Aceptar",
                            timer: 5000
                        });
                    }
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
            }
        };

        login.VALIDAR_STRING = function (value) {
            if (typeof value === 'string') {
                value = value.toUpperCase();
            }
            return value;
        };

        login.VALIDAR_STRING2 = function (value) {
            if (typeof value === 'string') {
                value = value.toLowerCase();
            }
            return value;
        };
    }
})();

