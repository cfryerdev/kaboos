(function () {
    angular.module('notifications')
    .controller('NotificationModalController', NotificationModalController);

    NotificationModalController.$inject = ['$modal', '$modalInstance', 'notificationService', 'options'];

    function NotificationModalController($modal, $modalInstance, notificationService, options) {
        var vm = this;
        vm.model = {};

        /****** Exposed Functions ******/

        vm.markRead = function () {
            notificationService.markRead(vm.model._id, function(data) {}, function(data) {});
            $modalInstance.close();
        };

        vm.markUnread = function () {
            notificationService.markUnread(vm.model._id, function(data) {}, function(data) {});
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.close();
        };

        /****** Constructor ******/

        (function () {
          vm.model = options.data;
          notificationService.markViewed(vm.model._id, function(data) {}, function(data) {});
        })();

        /****** Private Functions ******/


    }
})();
