(function() {
	
	var app = angular.module('tvApp', ['ngRoute', 'ngSanitize', 'angularUtils.directives.dirPagination']);

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
		.when('/details/:id', {
			templateUrl: 'pages/details.html',
			controller: 'showsCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		})

	app.factory('dataDownloader', ['$http', function($http){

		return function(callback) {

			var url = 'http://api.tvmaze.com/schedule';
			callback = callback||function(){};

			$http.get(url)
			.success(callback);

		};

	}]);

	app.controller('showsCtrl', ['$scope', 'dataDownloader', function($scope, dataDownloader, $filter) {

		    dataDownloader(function(data) {
				$scope.shows = data;
				for (i=0; i<$scope.shows.length; i++) {
					$scope.shows[i].show.summary.replace(/<(?:.|\n)*?>/gm, '');
				}
			});

		    $scope.sort = function(keyname) {
			    $scope.sortKey = keyname;
				$scope.reverse = !$scope.reverse;
		    }

		    $scope.clearSearch = function() {
		    	$scope.search = undefined;
		    }

	}]);


})();
