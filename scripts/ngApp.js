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

			var url = 'https://api.tvmaze.com/schedule';
			callback = callback||function(){};

			$http.get(url)
			.success(callback);

		};

	}]);

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

		    $scope.favs = JSON.parse(localStorage.getItem("showId")) || [];

		    $scope.checkFav = function(id) {
		    	if ($scope.favs.indexOf(id) == -1) {
		    		return false;
		    	} else {
		    		return true;
		    	}
		    }

		   	$scope.deleteFav = function(id) {
		   		var index = $scope.favs.indexOf(id);

		   		if (index > -1) {
		   			$scope.favs.splice(index, 1);
		   		}

		    	localStorage.setItem("showId", JSON.stringify($scope.favs));
		    	$scope.favsParsed = JSON.parse(localStorage.getItem("showId"));
		    }

		    $scope.addFav = function(id) {
		    	$scope.favs.push(id);
		    	localStorage.setItem("showId", JSON.stringify($scope.favs));
		    	$scope.favsParsed = JSON.parse(localStorage.getItem("showId"));
		    }

	}]);


})();
