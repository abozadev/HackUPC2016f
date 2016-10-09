angular.module('app.controllers', [])

.controller('carsCtrl', ['$scope', '$stateParams', 'Sentilo', '$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
      // You can include any angular dependencies as parameters for this function
      // TIP: Access Route Parameters for your page via $stateParams.parameterName
      function($scope, $stateParams, Sentilo, $cordovaGeolocation) {


<<<<<<< HEAD
        Sentilo.getCarsCatalog().then(function(success) {
            $scope.sensorsCatalog = success.data.providers[0].sensors;
            var options = {
              timeout: 10000,
              enableHighAccuracy: true
            };

            $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                  center: latLng,
                  zoom: 15,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                Sentilo.getCars().then(function(success) {
                    $scope.sensors = success.data.sensors;
                    google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                        angular.forEach($scope.sensorsCatalog, function(component) {
                            angular.forEach($scope.sensors, function(sensor) {
                                if (component.dataType == "BOOLEAN" && component.sensor == sensor.sensor) {
                                  console.log("Hello  " + component.sensor + "  " + sensor.sensor + " " + sensor.observations[0].value);
                                  if (sensor.observations[0].value == 'TRUE' || sensor.observations[0].value == 'true') {
                                    //console.log(obj)
                                    if (component.location != undefined) {
                                    var obj = new google.maps.LatLng(component.location.split(' ')[0], component.location.split(' ')[1]);
                                    var marker = new google.maps.Marker({
                                      map: $scope.map,
                                      animation: google.maps.Animation.DROP,
                                      position: obj
                                    });
                                }
                                }}
                              });
                            })
                        });
                    });
                  //});
                });
            });
          //})
        }
      ])


    .controller('terrorismCtrl', ['$scope', '$stateParams', 'Sentilo', '$cordovaGeolocation', '$interval', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
      // You can include any angular dependencies as parameters for this function
      // TIP: Access Route Parameters for your page via $stateParams.parameterName
      function($scope, $stateParams, Sentilo, $cordovaGeolocation, $interval, $http) {
        $scope.arrayOfCircles = [];
        $scope.sensorsCatalog = [];

        $scope.init = function() {
          Sentilo.getPeopleStreams().then(function(success) {
=======
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
        });
    })
}])

  
.controller('terrorismCtrl', ['$scope', '$stateParams', 'Sentilo', '$cordovaGeolocation', '$interval', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Sentilo, $cordovaGeolocation, $interval, $http) {
    $scope.arrayOfCircles = [];
    $scope.sensorsCatalog = [];
    
    $scope.init = function(){
        Sentilo.getPeopleStreams().then(function(success){
>>>>>>> 8c6284ab1d345c58618bcc8d4d0b2808205c2b76
            $scope.sensors = success.data.sensors;
            $scope.getItems();
          })
        }
        $scope.init();


        $scope.getItems = function() {
          if ($scope.sensorsCatalog.length == 0) {
            Sentilo.getPeopleCatalog().then(function(success) {
              $scope.sensorsCatalog = success.data.providers[0].sensors;
              $scope.updateCircles();
            })
          } else {
            $scope.updateCircles();
          }
        }

        $scope.updateCircles = function() {
          // Delete old circles.
          if ($scope.arrayOfCircles.length > 0) {
            $scope.arrayOfCircles.forEach(function(circle) {
              circle.setMap(null);
            })
            $scope.arrayOfCircles = [];
          }

          angular.forEach($scope.sensorsCatalog, function(sensor) {
            var sensorData = {};
            angular.forEach($scope.sensors, function(sensorsData) {
              if (sensor.sensor == sensorsData.sensor) {
                sensorData = sensorsData;
              }
            })
            var color = '#FF0000';
            if (sensorData.observations != undefined) {
              var per = parseInt(sensorData.observations[0].value);
              if (per <= 10) {
                color = '#65FF00';
              } else if (per <= 20) {
                color = '#96FF01';
              } else if (per <= 30) {
                color = '#C6FF03';
              } else if (per <= 40) {
                color = '#F5FF05';
              } else if (per <= 50) {
                color = '#FFDA06';
              } else if (per <= 60) {
                color = '#FFAC08';
              } else if (per <= 70) {
                color = '#FF7F09';
              } else if (per <= 80) {
                color = '#FF520B';
              } else if (per <= 90) {
                color = '#FF260D';
              } else if (per <= 100) {
                color = '#FF0F22';
              }

            }
            $scope.arrayOfCircles.push(new google.maps.Circle({
              strokeColor: color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: color,
              fillOpacity: 0.35,
              map: $scope.map,
              center: new google.maps.LatLng(sensor.location.split(' ')[0], sensor.location.split(' ')[1]),
              radius: 80
            }));
          })
<<<<<<< HEAD
        }

        $interval(function() {
          $scope.init();
        }, 3000);
        var options = {
          timeout: 10000,
          enableHighAccuracy: true
        };

        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          $scope.map = new google.maps.Map(document.getElementById("mapt"), mapOptions);
        });

      }
    ])

    .controller('menuCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
      // You can include any angular dependencies as parameters for this function
      // TIP: Access Route Parameters for your page via $stateParams.parameterName
      function($scope, $state) {}
    ])
=======
    }

    $interval(function() {$scope.init();}, 3000);
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
      
.controller('menuCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state) {
}])

.controller('reviewCtrl', ['$scope', '$state', 'Sentilo', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, Sentilo) {
    $scope.showReview = false;
    $scope.cities = [
        { id: 1, value: "Barcelona"},
        { id: 2, value: "London"},
        { id: 3, value: "Madrid"},
        { id: 4, value: "Detroit"},
        { id: 5, value: "Moscou"},
        { id: 6, value: "Amsterdam"},
        { id: 7, value: "San Francisco"},
        { id: 8, value: "Paris"},
        { id: 9, value: "Berlín"},
        { id: 10, value: "Tokio"},
        { id: 11, value: "Los Angeles"}
    ];

    $scope.stars = [
        { val: 1},
        { val: 2},
        { val: 3},
        { val: 4},
        { val: 5}
    ]

    $scope.model = {};
    $scope.getReviewsByCity = function(){
        Sentilo.getReviewsByCity($scope.model.idCity).then(function(success){
            $scope.reviews = success.data.reviews;
        })
    }

    $scope.saveReview = function(){
        Sentilo.saveReview($scope.model).then(function(success){
            $scope.getReviewsByCity();
            $scope.showReviewBtn();
        })
    }

    $scope.showReviewBtn = function(){
        $scope.showReview = !$scope.showReview;
    }
}])
>>>>>>> 8c6284ab1d345c58618bcc8d4d0b2808205c2b76
