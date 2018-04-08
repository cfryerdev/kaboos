(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('toggleSidebar', toggleSidebarDirective);

    toggleSidebarDirective.$inject = ['$window', '$location'];

    function toggleSidebarDirective($window, $location) {
  		return {
  			   restrict: 'A',
           scope: {
                modelLeft: '='
            },
           link: function(scope, element, attr) {
                element.on('click', function(){
                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function(){
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelLeft = false;
                            })
                        }
                    }
                })
            }

        };
    }
  }
());
