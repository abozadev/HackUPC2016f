angular.module('app.factorys', [])

.factory('Sentilo', ['$http', function($http){
	var url = 'http://api.sentilo.cloud/data/';

	return {
		getCars: function(){
			return $http.get(url + 'mycars', {headers: {'IDENTITY_KEY':'0aa89b6ab1ea9bdc2df322f057f3253ad255621ea38b2c11490bc2bd59a6dba7'}});
		}
	}

}]);
