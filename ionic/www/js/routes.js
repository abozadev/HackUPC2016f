angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('tabsController.cars', {
    url: '/cars',
    views: {
      'tab1': {
        templateUrl: 'views/cars.html',
        controller: 'carsCtrl'
      }
    }
  })

  .state('tabsController.drugs', {
    url: '/drugs',
    views: {
      'tab2': {
        templateUrl: 'views/drugs.html',
        controller: 'drugsCtrl'
      }
    }
  })


  .state('tabsController.terrorism', {
    url: '/terrorism',
    views: {
      'tab3': {
        templateUrl: 'views/terrorism.html',
        controller: 'terrorismCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/main',
    templateUrl: 'views/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/main/cars')

});