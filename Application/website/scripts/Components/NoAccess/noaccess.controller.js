//  $window.history.back();
(function () {

  'use strict';

  angular
    .module('app.common')
    .controller('NoAccessController', NoAccessController);

  NoAccessController.$inject = ['$window'];

  function NoAccessController($window) {
      var vm = this;

      vm.goBack = goBack;

      function goBack() {
        $window.history.go(-2);
      }
  }
})();
