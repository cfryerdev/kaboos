angular.module('team')
    .factory('teamService', ['baseService',
        function (baseService) {

            // Crud Calls
            // =================================================================

            function list(request, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/teams/', successCallback, errorCallback, finallyCallback, request);
            }

            function get(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/teams/' + id, successCallback, errorCallback, finallyCallback);
            }

            function save(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/teams/', model, successCallback, errorCallback, finallyCallback);
            }

            function remove(id, successCallback, errorCallback, finallyCallback) {
                baseService.delete('/api/teams/' + id, successCallback, errorCallback, finallyCallback);
            }

            function getProjects(teamId, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/teams/' + teamId + '/projects/', successCallback, errorCallback, finallyCallback);
            }

            function getTeamMembers(teamId, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/teams/' + teamId + '/members', successCallback, errorCallback, finallyCallback);
            }

            function addTeamMember(teamId, model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/teams/' + teamId + '/members/', model, successCallback, errorCallback, finallyCallback);
            }

            function deleteTeamMember(teamId, memberId, successCallback, errorCallback, finallyCallback) {
                baseService.delete('/api/teams/' + teamId + '/members/' + memberId, uccessCallback, errorCallback, finallyCallback);
            }

            // Return the calls
            // =================================================================

            return {
                list: list,
                get: get,
                save: save,
                remove: remove,
                getProjects: getProjects,
                getTeamMembers: getTeamMembers,
                addTeamMember: addTeamMember,
                deleteTeamMember: deleteTeamMember
            };

        }]);
