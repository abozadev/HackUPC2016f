angular.module('app.factorys', [])

.factory('Sentilo', ['$http', function($http){
	var urlData = 'http://10.192.98.160:8989/data/';
	var urlCatalog = 'http://10.192.98.160:8989/catalog/';

	return {
		getCars: function(){
			return $http.get(urlData + 'mycars');
		},
		getCarsCatalog: function(){
			return $http.get(urlCatalog + 'mycars');
		},
		getPeopleStreams: function(){
			return $http.get(url + 'pstreams');
		}
	}

}]);
