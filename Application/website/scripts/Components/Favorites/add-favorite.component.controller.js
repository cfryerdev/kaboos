(function() {
    angular
        .module('favorites')
        .controller('AddFavoriteComponentController', AddFavoriteComponentController);

    AddFavoriteComponentController.$inject = ['$rootScope', 'alertService', 'favoritesService'];

    function AddFavoriteComponentController($rootScope, alertService, favoritesService) {
        var vm = this;
        vm.id = '';
        vm.type = '';
        vm.record = '';
        vm.isFavorited = false;
        vm.toggleFavorite = toggleFavorite;

        /****** Constructor ******/

        (function() {

        })();

        $rootScope.$on('checkIsFavorited', function(evt, data) {
          vm.record = data;
          isFavorited();
        });

        /****** Functions ******/

        function toggleFavorite() {
            if (!vm.isFavorited) {
                addFavorite();
            } else {
                removeFavorite();
            }
        }

        function addFavorite() {
            var model = {};
            model[vm.type] = vm.record;
            if (vm.id == '') {
                favoritesService.add(model, function(data) {
                    vm.id = data._id;
                    vm.isFavorited = true;
                    alertService.clear();
                    alertService.add('success', 'Added to favorites.')
                });
            }
        }

        function removeFavorite() {
            if (vm.id != '') {
                favoritesService.remove(vm.id, undefined, undefined, function() {
                    vm.id = '';
                    vm.isFavorited = false;
                    alertService.clear();
                    alertService.add('success', 'Removed from favorites.')
                });
            }
        }

        function isFavorited() {
            var model = {};
            model.type = vm.type;
            model.record = vm.record;

            favoritesService.checkIsFavorited(model, function(data) {
                vm.id = data.id;
                vm.isFavorited = data.isFavorited;
            });
        }

    }

})();
