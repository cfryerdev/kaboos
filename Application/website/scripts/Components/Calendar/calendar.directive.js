(function () {
    'use strict';

    angular
        .module('app.ui')
        .directive('fullCalendar', fullCalendarDirective)
        .directive('calendar', calendarDirective)
        .directive('calendarView', calendarViewDirective);

    fullCalendarDirective.$inject = ['$rootScope'];
    calendarDirective.$inject = ['$compile', '$rootScope'];
    calendarViewDirective.$inject = [];

    function fullCalendarDirective($scope) {
        return {
            restrict: 'A',
            link: function(scope, element) {
              $rootScope.$on('bindToReleaseCalendar', function (event, data) {
                  bindCalendar(scope, element, data);
              });
            }
        }

        function bindCalendar(scope, element, data) {
          $(element).fullCalendar({
              contentHeight: 'auto',
              theme: true,
              header: {
                  right: '',
                  center: 'prev, title, next',
                  left: ''
              },
              defaultDate: '2014-06-12',
              editable: true,
              events: data
          });
        }
      }

    function calendarDirective($compile, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                select: '&',
                actionLinks: '=',
                events: '='
            },
            link: function(scope, element, attrs) {

              $rootScope.$on('bindToReleaseCalendar', function (event, data) {

                  var date = new Date();
                  var d = date.getDate();
                  var m = date.getMonth();
                  var y = date.getFullYear();

                  //Generate the Calendar
                  $(element).fullCalendar({
                      header: {
                          right: '',
                          center: 'prev, title, next',
                          left: ''
                      },

                      //Do not remove this as it ruin the design
                      theme: true,
                      selectable: true,
                      selectHelper: true,
                      editable: true,

                      //Add Events
                      events: data,

                      //On Day Select
                      select: function(start, end, allDay) {
                          scope.select({
                              start: start,
                              end: end
                          });
                      }
                  });
                });

                //var calendar = document.getElementsByClassName('fc-toolbar');
                //angular.element(calendar).append(scope.actionLinks);
            }
        }
    }

    function calendarViewDirective() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    $('#calendar').fullCalendar('changeView', attrs.calendarView);
                })
            }
        }
    }

  } ());
