angular.module('app.factorys', [])

.factory('Sentilo', ['$http', function($http){
	var url = 'http://10.193.81.170:8989/';
	var urlData = 'http://10.193.81.170:8989/data/';
	var urlCatalog = 'http://10.193.81.170:8989/catalog/';

	return {
		getCars: function(){
			return $http.get(urlData + 'mycars');
		},
		getCarsCatalog: function(){
			return $http.get(urlCatalog + 'mycars');
		},
		getPeopleStreams: function(){
			return $http.get(urlData + 'pstreams');
		},
		getPeopleCatalog: function(){
			return $http.get(urlCatalog + 'pstreams');
		},
		getReviewsByCity: function(id){
			return $http.get(url + 'getReviews/'+id);
		},
		saveReview : function(review){
			return $http.post(url + 'sendReview', review);
		}
	}

}]);
