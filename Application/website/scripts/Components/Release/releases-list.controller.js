(function () {
    angular.module('release')
    .controller('ReleaseController', ReleaseController);

    ReleaseController.$inject = ['$modal', '$rootScope', 'releaseService'];

    function ReleaseController($modal, $rootScope, releaseService) {
        var vm = this;
        vm.releases = [];
        vm.month = 'month';
        vm.actionMenu = '<ul class="actions actions-alt" id="fc-actions"> ' +
                        	'<li class="dropdown" uib-dropdown=""> ' +
                        		'<a href="#" uib-dropdown-toggle="" aria-expanded="false" class="dropdown-toggle" aria-haspopup="true"> ' +
                        		'	<i class="fa fa-ellipsis-v"></i> ' +
                        		'</a> ' +
                        		'<ul class="dropdown-menu dropdown-menu-right"> ' +
                        		'	<li><a href="" calendar-view="month">Month View</a></li> ' +
                        		'	<li><a href="" calendar-view="basicWeek">Week View</a></li> ' +
                        		'	<li><a href="" calendar-view="agendaWeek">Agenda Week View</a></li> ' +
                        		'	<li><a href="" calendar-view="basicDay">Day View</a></li> ' +
                        		'	<li><a href="" calendar-view="agendaDay">Agenda Day View</a></li> ' +
                        	'	</ul> ' +
                        '	</li> ' +
                      '</ul>';

        /****** Exposed Functions ******/

        vm.onSelect = onSelect;
        vm.listReleases = listReleases;

        /****** Constructor ******/

        (function () {
          vm.isLoading = true;
          listReleases();
        })();

        /****** Private Functions ******/

        function listReleases() {
          releaseService.list(function (data) {
            mapToCalendar(data);
          }, undefined, function() {
            vm.isLoading = false;
          });
        }

        function mapToCalendar(data) {
          var releases = [];
          angular.forEach(data, function (release) {
            releases.push({
              title: release.name,
              start: release.startDate,
              end: release.endDate,
              url: '#/companies/' + release.company._id + '/releases/'  + release._id,
              className: 'bgm-cyan' });
          });
          vm.releases = releases;
          $rootScope.$emit('bindToReleaseCalendar', releases);
        }

        function onSelect(argStart, argEnd) {
            var modalInstance  = $modal.open({
                backdrop: 'static',
                templateUrl: 'templates/releases/addEvent.html',
                controller: 'AddEventController',
                controllerAs: 'pageController',
                resolve: {
                    calendarData: function() {
                        var x = [argStart, argEnd];
                        return x;
                    }
                }
            });
        }

    }
})();
