(function () {
    'use strict';
    angular.module('appDApp').controller('LogCtrl', LogCtrl);
    LogCtrl.$inject = ['$scope', 'logService', 'localStorageService', '$filter'];
    function LogCtrl($scope, logService, localStorageService, $filter) {
        var logCtrl = this;
        logCtrl.log = logService.log;
        logCtrl.log.filter_dt_Start_Log = new Date();
        logCtrl.log.filter_dt_end_Log = new Date();
        if (localStorageService.get("log") !== null) {
            logCtrl.log.filter_state = localStorageService.get("log").filter_state;
        } else {
            logCtrl.log.filter_state = '';
        }

        logCtrl.onFindLogs = function () {
            localStorageService.set("log", logCtrl.log);
            swal({
                title: "Loading...",
                imageUrl: "images/loading.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            });
            if (!validControl(logCtrl.log.filter_dt_Start_Log)) {
                swal({
                    title: "Error",
                    text: "Invalid start Date.",
                    type: "error",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    confirmButtonText: "OK",
                    timer: 5000
                });
                logCtrl.log.filter_dt_Start_Log = new Date();
                return;
            }
            if (!validDates()) {
                swal({
                    title: "Error",
                    text: "End date is less than the start date.",
                    type: "error",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    confirmButtonText: "OK",
                    timer: 5000
                });
                logCtrl.log.filter_dt_Start_Log = new Date();
                logCtrl.log.filter_dt_end_Log = new Date();
                return;
            }
            logService.findLogs(logCtrl.log.filter_dt_Start_Log, logCtrl.log.filter_dt_end_Log, logCtrl.log.filter_state).then(function (data) {
                logCtrl.log.listLogs = $filter('orderBy')(data.data, 'dt_Start_Log', true);
                swal.close();
            }).catch(function (e) {
                swal({
                    title: "Error",
                    text: "Error.",
                    type: "error",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    confirmButtonText: "OK",
                    timer: 5000
                });
                return;
            });
        };

        function validDates() {
            var startdate = logCtrl.log.filter_dt_Start_Log;
            var enddate = logCtrl.log.filter_dt_end_Log;
            startdate.setHours(0, 0, 0, 0);
            if (!validControl(enddate)) {
                return true;
            }
            enddate.setHours(0, 0, 0, 0);
            if (startdate <= enddate) {
                return true;
            } else {
                return false;
            }
        }

        function validControl(control) {
            if (control === null || control === undefined || control === '') {
                return false;
            } else {
                return true;
            }
        }

        logCtrl.onFindLogs();

    }
})();


