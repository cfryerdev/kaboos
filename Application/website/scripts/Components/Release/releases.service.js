angular.module('release')
    .factory('releaseService', ['baseService', '$rootScope',
        function (baseService, $rootScope) {

            // Crud Calls
            // =================================================================

            function list(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/releases/', successCallback, errorCallback, finallyCallback);
            }

            function get(releaseId, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/releases/' + releaseId, successCallback, errorCallback, finallyCallback);
            }

            function listStages(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/releases/stages', successCallback, errorCallback, finallyCallback);
            }

            function listStatuses(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/releases/statuses', successCallback, errorCallback, finallyCallback);
            }

            // Return the calls
            // =================================================================

            return {
              list: list,
              get: get,
              listStages: listStages,
              listStatuses: listStatuses
            };

        }]);
