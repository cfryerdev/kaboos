angular.module('account')
    .factory('accountService', ['baseService', '$rootScope',
        function (baseService, $rootScope) {

            // Crud Calls
            // =================================================================

            function login(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/account/login', model, function (data) {
                  $rootScope.$broadcast('accountService:login', data);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function logout(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/logout', successCallback, errorCallback, function () {
                  $rootScope.$broadcast('accountService:logout', null);
                  finallyCallback();
                });
            }

            function isLoggedIn(successCallback) {
                baseService.get('/api/account/status', successCallback);
            }

            function register(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/account/register', model, function (data) {
                  $rootScope.$broadcast('accountService:login', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function getProfile(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/', successCallback, errorCallback, finallyCallback);
            }

            function saveProfile(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/account/', model, successCallback, errorCallback, finallyCallback);
            }

            function getPrefs(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/prefs', successCallback, errorCallback, finallyCallback);
            }

            function getInvites(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/invites', function (data) {
                  $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function getNotifications(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/notifications', function (data) {
                  // $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function getCompanies(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/companies', successCallback, errorCallback, finallyCallback);
            }

            function savePrefs(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/account/prefs/', model, successCallback, errorCallback, finallyCallback);
            }

            function acceptInvite(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/invites/accept/' + id, function (data) {
                  $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function declineInvite(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/account/invites/decline/' + id, function (data) {
                  $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function savePassword(model, successCallback, errorCallback, finallyCallback) {
                baseService.create('/api/account/changePassword/', model, successCallback, errorCallback, finallyCallback);
            }

            // Return the calls
            // =================================================================

            return {
                login: login,
                logout: logout,
                isLoggedIn: isLoggedIn,
                register: register,
                getProfile: getProfile,
                saveProfile: saveProfile,
                getPrefs: getPrefs,
                getInvites: getInvites,
                getNotifications: getNotifications,
                getCompanies: getCompanies,
                savePrefs: savePrefs,
                acceptInvite: acceptInvite,
                declineInvite: declineInvite,
                savePassword: savePassword
            };

        }]);
