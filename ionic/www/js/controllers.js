angular.module('app.controllers', [])
  
.controller('carsCtrl', ['$scope', '$stateParams', 'Sentilo', '$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Sentilo, $cordovaGeolocation) {
    Sentilo.getCars().then(function(success){
        $scope.sensors = success.data.sensors;
    })

    Sentilo.getCarsCatalog().then(function(success){
        $scope.sensorsCatalog = success.data.providers[0].sensors;
        var options = {timeout: 10000, enableHighAccuracy: true};
 
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function(){
                angular.forEach($scope.sensorsCatalog, function(sensor){
                    var obj = new google.maps.LatLng(sensor.location.split(' ')[0], sensor.location.split(' ')[1]);
                    console.log(obj)
                    var marker = new google.maps.Marker({
                      map: $scope.map,
                      animation: google.maps.Animation.DROP,
                      position: obj
                    });
                })
                

            });

        }, function(error){
            console.log("Could not get location");
        });
    })
    



}])

   
.controller('drugsCtrl', ['$scope', '$state', 'Sentilo', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope, $stateParams, Sentilo) {
  

}])
   
.controller('terrorismCtrl', ['$scope', '$stateParams', 'Sentilo', '$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Sentilo, $cordovaGeolocation) {
    Sentilo.getPeopleStreams().then(function(success){
        $scope.sensors = success.data.sensors;
        Sentilo.getPeopleCatalog().then(function(success){
            $scope.sensorsCatalog = success.data.providers[0].sensors;
                angular.forEach($scope.sensorsCatalog, function(sensor){
                    var sensorData = {};
                    angular.forEach($scope.sensors, function(sensorsData){
                        if (sensor.sensor == sensorsData.sensor){
                            sensorData = sensorsData;
                        }
                    })
                    console.log(sensorData)
                    var cityCircle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: $scope.map,
                        center: new google.maps.LatLng(sensor.location.split(' ')[0], sensor.location.split(' ')[1]),
                        radius: sensorData.observations != undefined ? parseInt(sensorData.observations[0].value) : 50
                      });
                  })
        })
    })

    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("mapt"), mapOptions);
    });

    

}])
      
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])