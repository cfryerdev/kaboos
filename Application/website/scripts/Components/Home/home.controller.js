//  $window.history.back();
(function () {

  'use strict';

  angular
    .module('app.common')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$window', 'alertService'];

  function HomeController($window, alertService) {
      var vm = this;

      (function () {
        alertService.clear();
      })();

  }
})();
