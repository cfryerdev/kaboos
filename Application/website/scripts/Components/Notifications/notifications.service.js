angular.module('notifications')
    .factory('notificationService', ['baseService', '$rootScope',
        function (baseService, $rootScope) {

            // Crud Calls
            // =================================================================

            function getNotifications(successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/notifications', function (data) {
                  // $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function markRead(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/notifications/' + id + '/markRead', function (data) {
                  // $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function markUnread(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/notifications/' + id + '/markUnread', function (data) {
                  // $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }

            function markViewed(id, successCallback, errorCallback, finallyCallback) {
                baseService.get('/api/notifications/' + id + '/markViewed', function (data) {
                  // $rootScope.$broadcast('accountService:checkInviteCount', null);
                  successCallback(data);
                }, errorCallback, finallyCallback);
            }


            // Return the calls
            // =================================================================

            return {
                getNotifications: getNotifications,
                markRead: markRead,
                markUnread: markUnread,
                markViewed: markViewed
            };

        }]);
