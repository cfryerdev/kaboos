(function () {
    angular.module('release')
    .controller('AddEventController', AddEventController);

    AddEventController.$inject = ['$modal', '$modalInstance', 'calendarData'];

    function AddEventController($modal, $modalInstance, calendarData) {
        var vm = this;

        vm.calendarData = {
            eventStartDate: calendarData[0],
            eventEndDate:  calendarData[1]
        };

        vm.tags = [
            'bgm-teal',
            'bgm-red',
            'bgm-pink',
            'bgm-blue',
            'bgm-lime',
            'bgm-green',
            'bgm-cyan',
            'bgm-orange',
            'bgm-purple',
            'bgm-gray',
            'bgm-black',
        ];
        vm.currentTag = '';


        /****** Exposed Functions ******/

        vm.onTagClick = onTagClick;
        vm.create = create;
        vm.cancel = cancel;

        /****** Constructor ******/

        (function () {

        })();

        /****** Private Functions ******/

        function onTagClick(tag, $index) {
            vm.activeState = $index;
            vm.activeTagColor = tag;
        }

        function create() {
            if ($scope.calendarData.eventName) {

                $('#calendar').fullCalendar('renderEvent',{
                    title: $scope.calendarData.eventName,
                    start: $scope.calendarData.eventStartDate,
                    end:  $scope.calendarData.eventEndDate,
                    allDay: true,
                    className: vm.activeTagColor

                },true );

                vm.activeState = -1;
                vm.calendarData.eventName = '';
                $modalInstance.close();
            }
        }

        function cancel() {
            $modalInstance.dismiss();
        }
    }

})();
