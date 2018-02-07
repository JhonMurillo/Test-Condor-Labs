(function () {
    'use strict';
    angular.module('appDApp.service').service('logService', logService);
    logService.$inject = ['$http', '$q', '$filter'];

    function logService($http, $q, $filter) {
        var serviceLog = this;
        serviceLog.findLogs = getLogs;
        serviceLog.log = {};

        var url = "https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?";

        function executeServicesGet(urlRequest) {
            var defered = $q.defer();
            $http({
			  method: 'GET',
			  url: urlRequest
			}).then(function (response){
				defered.resolve(response);
			},function (error){
				defered.reject(error);
			});
            return defered.promise;
        }

        function getLogs(startdate, enddate, state) {
            var query = '';
            if (startdate !== null && startdate !== undefined && startdate !== '') {
                var start = $filter('date')(startdate, "MM/dd/yyyy");
                query = "startdate=" + start;
            }
            if (enddate !== null && enddate !== undefined && enddate !== '') {
                var end = $filter('date')(enddate, "MM/dd/yyyy");
                query = query + "&enddate=" + end;
            }
            if (state !== null && state !== undefined && state !== '') {
                query = query + "&state=" + state;
            }
            var urlRequest = url + query;
            return executeServicesGet(urlRequest);
        }
    }
})();