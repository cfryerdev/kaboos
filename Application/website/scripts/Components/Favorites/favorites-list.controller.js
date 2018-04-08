(function () {
    angular
      .module('favorites')
      .controller('FavoritesController', FavoritesController);

    FavoritesController.$inject = ['$controller', '$scope', 'alertService', 'favoritesService'];

    function FavoritesController($controller, $scope, alertService, favoritesService) {
        var vm = this;
        var base = {};

        vm.isLoading = false;
        vm.favorites = [];

        /****** Constructor ******/

        function init() {
            vm.isLoading = true;
            listFavorites();
        }
        vm.init = init;
        init();

        /****** Base Call Events ******/

        function listFavorites() {
          favoritesService.list(function (data) {
            vm.favorites = data;
          }, undefined, function() {
            vm.isLoading = false;
          });
        }


    }

})();
