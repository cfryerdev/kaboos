angular.module('favorites')
    .factory('favoritesService', ['baseService', '$rootScope',
        function (baseService, $rootScope) {

            // Crud Calls
            // =================================================================

            function list(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/favorites/', successCallback, errorCallback, finallyCallback);
            }

            function add(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/favorites/', model, successCallback, errorCallback, finallyCallback);
            }

            function remove(id, successCallback, errorCallback, finallyCallback) {
                baseService.delete('/api/favorites/' + id, successCallback, errorCallback, finallyCallback);
            }

            function checkIsFavorited(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/favorites/check', model, successCallback, errorCallback, finallyCallback);
            }

            // Return the calls
            // =================================================================

            return {
                list: list,
                add: add,
                remove: remove,
                checkIsFavorited: checkIsFavorited
            };

        }]);
