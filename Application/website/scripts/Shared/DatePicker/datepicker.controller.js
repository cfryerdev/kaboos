angular.module('app.base')
    .controller('DatePickerController', ['',
        function () {
            var vm = this;

            vm.today();
            vm.toggleMin();

            vm.today = function() {
              vm.dt = new Date();
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };

            vm.open = function($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();
                vm[opened] = true;
            };

            vm.dateOptions = { formatYear: 'yyyy', startingDay: 1 };

            vm.format = 'shortDate';
          }
    ]);
