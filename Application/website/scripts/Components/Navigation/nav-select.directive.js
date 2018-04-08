(function () {
    'use strict';

    angular
        .module('app.common')
        .directive('navSelect', navSelectDirective);

    navSelectDirective.$inject = ['$window', '$location'];

    function navSelectDirective($window, $location) {
  		return {
  			   restrict: 'A',
           scope: {
                navSelect: '='
            },
           link: checkRoute
        };

  		function checkRoute(scope, element, attributes) {
          //var url = $location.path();
          //console.log('URL -> ' + url);
          // var parent = angular.element(document.querySelector('#main-nav-list'));
          // if (angular.isDefined(parent)) {
          //   if (url.includes(scope.navSelect))
          //   {
          //     for (var i = 0; i < parent.children.length; i++) {
          //       parent.children[i].removeClass("active");
          //     }
          //     element.addClass("active");
          //   }
          // }
      }
    }
  }
());
