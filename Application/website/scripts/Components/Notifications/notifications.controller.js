(function () {
    angular.module('notifications')
    .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['$modal', 'notificationService'];

    function NotificationController($modal, notificationService) {
        var vm = this;
        vm.isLoading = false;
        vm.unread_notifications = [];
        vm.read_notifications = [];

        /****** Exposed Functions ******/

        vm.viewNotification = viewNotification;

        /****** Constructor ******/

        (function () {
          vm.isLoading = true;
          loadNotifications();
        })();

        /****** Private Functions ******/

        function loadNotifications() {
          vm.unread_notifications = [];
          vm.read_notifications = [];
          notificationService.getNotifications(function (data) {
              angular.forEach(data, function(notification) {

                if (notification.isRead) {
                  vm.read_notifications.push(notification);
                } else {
                  vm.unread_notifications.push(notification);
                }

                vm.read_notifications.sort(function(a, b) {
                    a = new Date(a.createdAt);
                    b = new Date(b.createdAt);
                    return a > b ? -1 : a < b ? 1 : 0;
                });

                vm.unread_notifications.sort(function(a, b) {
                    a = new Date(a.createdAt);
                    b = new Date(b.createdAt);
                    return a > b ? -1 : a < b ? 1 : 0;
                });

              });
          }, undefined, function() {
            vm.isLoading = false;
          });
        }

        function viewNotification(item) {
          $modal.open({
              backdrop: 'static',
              templateUrl: 'templates/notifications/viewNotificationModal.html',
              controller: 'NotificationModalController as modalController',
              resolve: {
                  options: function () {
                      return {
                          data: item
                      }
                  }
              }
          }).result.then(function (data) {
              loadNotifications();
          }, undefined);
        }
    }
})();
