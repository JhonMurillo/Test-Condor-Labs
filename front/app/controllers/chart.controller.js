(function () {
    'use strict';
    angular.module('appDApp').controller('ChartCtrl', ChartCtrl);
    ChartCtrl.$inject = ['$scope', 'localStorageService', '$filter', 'logService'];
    function ChartCtrl($scope, localStorageService, $filter, logService) {
        var chartCtrl = this;
        chartCtrl.log = logService.log;
        chartCtrl.log.listLogs = logService.log.listLogs;
        chartCtrl.totalAverageResponse;
        chartCtrl.lineChartLabels = [];
        chartCtrl.barChartLabelsCdMachine = [];
        chartCtrl.barChartLabelsCompliance = [];
        chartCtrl.data = [];
        chartCtrl.dataCdMachine = [];
        chartCtrl.dataCompliance = [];
        var chartAverageResponseTimePerDay = document.getElementById("chartAverageResponseTimePerDay");
        var totalRequestsPerMachine = document.getElementById("totalRequestsPerMachine");
        var totalRequestsPerComplainceStatus = document.getElementById("totalRequestsPerComplainceStatus");

        if (!validControl(logService.log.listLogs)) {
            chartCtrl.log.listLogs = [];
        }


        function  getTotalAverageResponseTime() {
            var sum = 0;
            if (chartCtrl.log.listLogs && chartCtrl.log.listLogs.length > 0) {
                chartCtrl.log.listLogs.forEach(each => {
                    sum += (new Date(each.dt_end_log).getTime() - new Date(each.dt_Start_Log).getTime());
                });
            }
            chartCtrl.totalAverageResponse = sum;
        }

        function getChartAverageResponseTimePerDay() {
            var listChartLine = [];
            var dateObject = {};
            chartCtrl.log.listLogs.forEach(value => {
                dateObject = {};
                var date = $filter('date')(value.dt_Start_Log, "MM/dd/yyyy");
                var index = containsDate(listChartLine, date);
                if (index === null) {
                    var dates = [];
                    dates.push(new Date(value.dt_end_log).getTime() - new Date(value.dt_Start_Log).getTime());
                    dateObject.dates = dates;
                    dateObject.date = date;
                    listChartLine.push(dateObject);
                } else {
                    dateObject = listChartLine[index];
                    dateObject.dates.push(new Date(value.dt_end_log).getTime() - new Date(value.dt_Start_Log).getTime());
                    listChartLine[index] = dateObject;
                }
            });

            listChartLine.forEach((value, key) => {
                chartCtrl.lineChartLabels.push(value.date);
                var total = value.dates.length;
                var sumatory = value.dates.reduce((a, b) => a + b);
                chartCtrl.data.push(sumatory / total);
            });


            var speedData = {
                labels: chartCtrl.lineChartLabels,
                datasets: [{
                        label: "Average Response Time per Day",
                        data: chartCtrl.data,
                    }]
            };

            var chartOptions = {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 80,
                        fontColor: 'black'
                    }
                }
            };

            var lineChart = new Chart(chartAverageResponseTimePerDay, {
                type: 'line',
                data: speedData,
                options: chartOptions
            });
        }

        function getTotalRequestsPerMachine() {
            var listChartBar = [];
            var cdMachineObject = {};
            chartCtrl.log.listLogs.forEach(value => {
                cdMachineObject = {};
                var cdMachine = value.cd_machine;
                var index = containsCdMachine(listChartBar, cdMachine);
                if (index === null) {
                    cdMachineObject.cdMachine = cdMachine;
                    cdMachineObject.size = 1;
                    listChartBar.push(cdMachineObject);
                } else {
                    cdMachineObject = listChartBar[index];
                    cdMachineObject.size = cdMachineObject.size + 1;
                    listChartBar[index] = cdMachineObject;
                }
            });

            listChartBar.forEach((value, key) => {
                chartCtrl.barChartLabelsCdMachine.push(value.cdMachine);
                chartCtrl.dataCdMachine.push(value.size);
            });


            var speedData = {
                labels: chartCtrl.barChartLabelsCdMachine,
                datasets: [{
                        label: "Total Requests Per Machine",
                        data: chartCtrl.dataCdMachine
                    }]
            };

            var chartOptions = {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 80,
                        fontColor: 'black'
                    }
                }
            };

            var lineChart = new Chart(totalRequestsPerMachine, {
                type: 'bar',
                data: speedData,
                options: chartOptions
            });
        }

        function getTotalRequestsPerComplianceStatus() {
            var listChartBar = [];
            var complainceObject = {};
            chartCtrl.log.listLogs.forEach(value => {
                complainceObject = {};
                var complaince = value.ds_compl_status_returned;
                var index = containsComplain(listChartBar, complaince);
                if (index === null) {
                    complainceObject.complaince = complaince;
                    complainceObject.size = 1;
                    listChartBar.push(complainceObject);
                } else {                  
                    complainceObject = listChartBar[index];
                    complainceObject.size = complainceObject.size + 1;
                    listChartBar[index] = complainceObject;
                }
            });

            listChartBar.forEach((value, key) => {
                chartCtrl.barChartLabelsCompliance.push(value.complaince);
                chartCtrl.dataCompliance.push(value.size);
            });


            var speedData = {
                labels: chartCtrl.barChartLabelsCompliance,
                datasets: [{
                        label: "Total Requests Per Compliance Status",
                        data: chartCtrl.dataCompliance
                    }]
            };

            var chartOptions = {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 80,
                        fontColor: 'black'
                    }
                }
            };

            var lineChart = new Chart(totalRequestsPerComplainceStatus, {
                type: 'bar',
                data: speedData,
                options: chartOptions
            });
        }


        getTotalAverageResponseTime();
        getChartAverageResponseTimePerDay();
        getTotalRequestsPerMachine();
        getTotalRequestsPerComplianceStatus()

        function validControl(control) {
            if (control === null || control === undefined || control === '') {
                return false;
            } else {
                return true;
            }
        }

        function containsCdMachine(list, value) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].cdMachine === value) {
                    return i;
                }
            }
            return null;
        }

        function containsComplain(list, value) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].complaince === value) {
                    return i;
                }
            }
            return null;
        }
        
        function containsDate(list, value) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].date === value) {
                    return i;
                }
            }
            return null;
        }
    }
})();


