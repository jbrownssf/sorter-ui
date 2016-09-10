// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'jrCrop',
    'starter.controllers', 'SSFConfig', 'SSFAlerts',
    'SSFCamera', 'starter.services', 'SSFSpinner'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu/menu.html',
    controller: 'SideMenuCtrl'
  })
  .state('app.landing', {
    url: '/',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing/landing.html',
        controller: 'LandingCtrl'
      }
    }
  })
  .state('app.cat-home', {
    url: '/catalog-home',
    views: {
      'menuContent': {
        templateUrl: 'templates/catalog/cat-home/cat-home.html',
        controller: 'CatHomeCtrl'
      }
    }
  })
  .state('app.cat-fails', {
    url: '/catalog-fails',
    views: {
      'menuContent': {
        templateUrl: 'templates/catalog/cat-fails/cat-fails.html',
        controller: 'CatFailsCtrl'
      }
    }
  })
  .state('app.cat-view', {
    url: '/catalog-view',
    views: {
      'menuContent': {
        templateUrl: 'templates/catalog/cat-view/cat-view.html',
        controller: 'CatViewCtrl'
      }
    }
  })
  
  
  
  
  .state('navigation', {
    url: '/navigation',
    template:
      '<ion-view hide-nav-bar="false" title="Navigation">' +
        '<ion-nav-buttons></ion-nav-buttons>' +
        '<ion-content class="padding">' +
          '<button class="button button-block button-calm ssf-button" ng-repeat="nav in navLinks" ui-sref="{{nav}}">{{nav}}</button>' +
        '</ion-content>' +
      '</ion-view>',
    controller: function($state, $scope) {
      var stateArray = $state.get();
      $scope.navLinks = [];
      for(var i in stateArray) {
        if(stateArray[i].name !== '' && stateArray[i].name !== 'app' && stateArray[i].name !== 'navigation' && stateArray[i].name !== 'update') {
          $scope.navLinks.push(stateArray[i].name);
        }
      }
      $scope.navLinks.sort();
    }
  });
  $urlRouterProvider.otherwise('/');

});
