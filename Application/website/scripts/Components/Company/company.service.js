angular.module('company')
    .factory('companyService', ['baseService', '$rootScope',
        function (baseService, $rootScope) {

            // Crud Calls
            // =================================================================

            function list(request, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/companies/', successCallback, errorCallback, finallyCallback, request);
            }

            function get(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/companies/' + id, successCallback, errorCallback, finallyCallback);
            }

            function save(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/companies/', model, successCallback, errorCallback, finallyCallback);
            }

            function remove(id, successCallback, errorCallback, finallyCallback) {
                baseService.delete('/api/companies/' + id, successCallback, errorCallback, finallyCallback);
            }

            // Lazy Load Calls
            // =================================================================

            function getProjects(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/companies/' + id + '/projects/', successCallback, errorCallback, finallyCallback);
            }

            function getTeams(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/companies/' + id + '/teams/', successCallback, errorCallback, finallyCallback);
            }

            function getMembers(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/companies/' + id + '/members/', successCallback, errorCallback, finallyCallback);
            }

            function createInvite(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/companies/invite/', model,  function (data) {
                  $rootScope.$broadcast('accountService:logout', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function getMemberTypes(successCallback, errorCallback, finallyCallback) {
              baseService.get('/api/companyMemberTypes/', successCallback, errorCallback, finallyCallback);
            }

            function getTopology(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/topology/' + id, successCallback, errorCallback, finallyCallback);
            }

            // Return the calls
            // =================================================================

            return {
                list: list,
                get: get,
                save: save,
                remove: remove,
                getProjects: getProjects,
                getTeams: getTeams,
                getMembers: getMembers,
                createInvite: createInvite,
                getMemberTypes: getMemberTypes,
                getTopology: getTopology
            };

        }]);
