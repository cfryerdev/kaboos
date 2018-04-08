angular.module('project')
    .factory('projectService', ['baseService',
        function (baseService) {

            // Crud Calls
            // =================================================================

            function list(request, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/projects/', successCallback, errorCallback, finallyCallback, request);
            }

            function get(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/projects/' + id, successCallback, errorCallback, finallyCallback);
            }

            function save(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/projects/', model, successCallback, errorCallback, finallyCallback);
            }

            function remove(id, successCallback, errorCallback, finallyCallback) {
                baseService.delete('/api/projects/' + id, successCallback, errorCallback, finallyCallback);
            }

            // Lazy Load Calls
            // =================================================================

            function getProjectTypes(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/projecttypes', successCallback, errorCallback, finallyCallback);
            }

            function getParents(projectId, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/projects/' + projectId + '/parents/', successCallback, errorCallback, finallyCallback);
            }

            function getChildren(projectId, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/projects/' + projectId + '/children/', successCallback, errorCallback, finallyCallback);
            }

            function getTeams(projectId, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/projects/' + projectId + '/teams/', successCallback, errorCallback, finallyCallback);
            }


            // Custom calls
            // =================================================================

            function addProjecttDependency(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/projectDependencies/', model, successCallback, errorCallback, finallyCallback);
            }

            function addTeamProject(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/teamProjects/', model, successCallback, errorCallback, finallyCallback);
            }

            // Return the calls
            // =================================================================

            return {
                list: list,
                get: get,
                save: save,
                remove: remove,
                getProjectTypes: getProjectTypes,
                getParents: getParents,
                getChildren: getChildren,
                getTeams: getTeams,
                addProjecttDependency: addProjecttDependency,
                addTeamProject: addTeamProject
            };

        }]);
