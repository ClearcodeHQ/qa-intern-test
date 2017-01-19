(function() {
	
	var app = angular.module('tvApp', ['ngRoute']);

	app.factory('dataDownloader', ['$http', function($http){

		return function(callback) {

			var url = 'http://api.tvmaze.com/schedule';
			callback = callback||function(){};

			$http.get(url)
			.success(callback);

		};

	}]);

	app.controller('showsCtrl', ['$scope', 'dataDownloader', function($scope, dataDownloader) {

		    dataDownloader(function(data) {
				$scope.shows = data;
				console.log($scope.shows);
			});
	}]);

})();
