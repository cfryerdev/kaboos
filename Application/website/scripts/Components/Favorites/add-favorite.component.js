(function () {
	angular
      .module('favorites')
      .component('addFavorite', {
				 templateUrl: 'templates/favorites/add-favorite.component.html',
				 controller: 'AddFavoriteComponentController',
				 priority: 100,
				 bindings: {
		        type: '@'
		     }
      });
})();
