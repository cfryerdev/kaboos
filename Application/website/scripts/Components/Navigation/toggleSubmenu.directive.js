(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('toggleSubmenu', toggleSubmenuDirective);

    toggleSubmenuDirective.$inject = ['$window', '$location'];

    function toggleSubmenuDirective($window, $location) {
  		return {
        restrict: 'A',
         link: function(scope, element, attrs) {
           if (element && element.click){
             element.click(function(){
                 element.next().slideToggle(200);
                 element.parent().toggleClass('toggled');
             });
           }
         }
        };
    }
  }
());
