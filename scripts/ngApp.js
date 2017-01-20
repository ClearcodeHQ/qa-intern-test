(function() {
	
	var app = angular.module('tvApp', ['ngRoute', 'ngSanitize', 'angularUtils.directives.dirPagination']);

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
		.when('/home', {
			templateUrl: 'pages/home.html',
			controller: 'showsCtrl'
		})
		.when('/details/:showId', {
			templateUrl: 'pages/details.html',
			controller: 'showsCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		})

	}]);

	app.factory('dataDownloader', ['$http', function($http){

		return function(callback) {

			var url = 'http://api.tvmaze.com/schedule';
			callback = callback||function(){};

			$http.get(url)
			.success(callback);

		};

	}]);

	// app.filter('clearDesc', ['clearDesc', function(decoration) {

	//   function clearedDesc(input) {
	//     input = input.replace("<p>", "");
	//     input = input.replace("<strong>", "");
	//     return input;
	//   }
	//   clearedDesc.$stateful = true;

	//   return clearedDesc;
	// }])

	app.controller('showsCtrl', ['$scope', '$routeParams', 'dataDownloader', function($scope, $routeParams, dataDownloader, $filter) {

			$scope.id = $routeParams.showId; 

		    dataDownloader(function(data) {
				$scope.shows = data;

				for (i=0; i < $scope.shows.length; i++) {
					$scope.shows[i].show.summary = $scope.shows[i].show.summary.replace('<p>','').replace('<strong>','').replace('</p>','').replace('</strong>','').replace('</em>','').replace('<em>','').replace('<i>','').replace('</i>','');
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
