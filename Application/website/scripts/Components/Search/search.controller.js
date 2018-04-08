//  $window.history.back();
(function () {

  'use strict';

  angular
    .module('search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$window', 'alertService'];

  function SearchController($window, alertService) {
      var vm = this;

      (function () {
        alertService.clear();
      })();

  }
})();
