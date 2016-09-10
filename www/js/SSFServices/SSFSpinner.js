/* Spinner while waiting for a call to return from a backend
Instructions:
1.  Inject 'SSFSpinner' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFSpinner.js"></script>' into the index.html
            file above the app.js.
Feature:  If you set '$rootScope.stopSpinner = true' you can turn it off.
    It will revert back to false after the first call ends.
*/


angular.module('SSFSpinner', [])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        if(config.url.indexOf("http")===0)
          $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        
        if(response.config.url.indexOf("http")===0)
          $rootScope.$broadcast('loading:hide');
        return response;
      },
      requestError: function(reason) {
        
        $rootScope.$broadcast('loading:hide');
        return reason;
      },
      responseError: function(response) {
        
        $rootScope.$broadcast('loading:hide');
        if(response.status === 401 && (
            response.data.error.code === "INVALID_TOKEN" ||
            response.data.error.code === "AUTHORIZATION_REQUIRED")) {
          $rootScope.$broadcast('request:auth');
        }
        return response;
      }
    };
  });
}])
.run(["$rootScope", "$ionicLoading", function($rootScope, $ionicLoading) {
  $rootScope.stopSpinner = false;
  $rootScope.$on('loading:show', function() {
    var options = { 
      // template: '<ion-spinner icon="bubbles" class="spinner-dark"></ion-spinner>'
      template: '<ion-spinner icon="bubbles" class="spinner-stable"></ion-spinner>'
    };
    if(!ionic.Platform.isWebView()) {
      options["noBackdrop"] = true;
    }
    if(!$rootScope.stopSpinner) {
      $ionicLoading.show(options);
    }
  });
  $rootScope.$on('loading:hide', function() {
    $rootScope.stopSpinner = false;
      $ionicLoading.hide();
  });
}]);