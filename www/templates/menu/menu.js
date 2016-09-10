"use strict";
/*global angular Ionic ionic*/

angular.module('starter.controllers')

.controller('SideMenuCtrl', ['$scope', '$rootScope', 'SSFConfigConstants', '$ionicPlatform',
  '$window', '$ionicSideMenuDelegate', '$ionicHistory', '$state', 'SSFAlertsService',
  '$ionicSlideBoxDelegate',
  function($scope, $rootScope, SSFConfigConstants, $ionicPlatform, $window,
    $ionicSideMenuDelegate, $ionicHistory, $state, SSFAlertsService,
    $ionicSlideBoxDelegate) {

    $scope.minWidth = "(min-width:" + SSFConfigConstants.SSFDirectives.contentWidth + "px)";

    $scope.isAsideExposed = $ionicSideMenuDelegate.isAsideExposed;
    $rootScope.$on('$ionicExposeAside', function(evt, isAsideExposed) {
      $scope.isAsideExposed = isAsideExposed;
    });

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        // SSFAlertsService.showAlert('ERROR.TITLE', 'Am I online? ' + navigator.onLine);
        if ($ionicSideMenuDelegate._instances[0].isOpen() === true) {
          $ionicSideMenuDelegate.toggleLeft();
        }
        
        if(!$scope.signedIn && $window.localStorage.token) {
          BadgeServ.updateCount();
        }
        
        $scope.signedIn = $window.localStorage.token ? true : false;
        runCheck();
      });
    
    $scope.signedIn = $window.localStorage.token ? true : false;
    runCheck();
    function runCheck() {
      if($scope.signedIn) {
        MembersRest.getCurrentOrgs($window.localStorage.token, $window.localStorage.userId)
          .then(function(res) {
            if (res.status !== 200)
              return; //errArr[0] = res;
            // errArr[0] = 200;
            $scope.myOrgs = res.data;
          }, function(err) {
            // errArr[0] = err;
          });
      }
    }

    $scope.showMenu = true;

    $scope.logOut = function() {
      $rootScope.$broadcast('request:auth');
    };

    // $scope.privacyPolicy = function() {
    //   if (!$rootScope.online) {
    //     return SSFAlertsService.showAlert('ERROR.TITLE', 'ERROR.OFFLINE_POLICY');
    //   }
    //   else if ($window.cordova && cordova.InAppBrowser) {
    //     // cordova.InAppBrowser.open('https://www.zebit.com/privacy-policy', '_blank', 'location=no,hardwareback=no');
    //   }
    //   else {
    //     // $window.open('https://www.zebit.com/privacy-policy');
    //   }
    // };

    $scope.userLiscense = function() {
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      });
      shouldCloseMenu('app.configure-eula');
    };

    $scope.feedback = function() {
      SSFAlertsService.showConfirm("Warning", "Would you like to open your email to send us feed back?")
        .then(function(response) {
          if (response) {
            SSFMailService.sendMail("Simply Scheduling Feedback", "", "john.p.brown@outlook.com");
          }
        });
    };

    function shouldCloseMenu(toState) {
      if ($state.$current.self.name === toState) {
        $state.reload();
      }
      else {
        $state.go(toState);
      }
    }

    $scope.userProfile = function() {
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      });
      return $state.go('app.user');
    };
    
    $scope.goLobby = function() {
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      });
      return $state.go('app.lobby');
    };

    $scope.createEmail = function() {
      var confirmed = SSFAlertsService.showConfirm("Would you like to provide your feedback through email?");
      if (confirmed == true) {
        SSFMailService.sendMail();
      }
    };

    $scope.nextPage = function(member) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $window.localStorage['orgId'] = member.orgId;
      $state.go('app.org.detail.lobby', {
        orgId: member.orgId
      });
    };
    
    $scope.openEula = function() {
      if($window.cordova && cordova.InAppBrowser){
        cordova.InAppBrowser.open(SSFConfigConstants.eulaUrl, '_blank', 'location=no,hardwareback=no');
      } else {
        $window.open(SSFConfigConstants.eulaUrl);
      }
    };
    
    $scope.openExamples = function() {
      if($scope.modal) {
        $ionicSlideBoxDelegate.slide(0);
        $scope.modal.show();
      } else {
        ExamplesServ.show({scope: $scope});
      }
    };
    
    $scope.ssfInputModal =function() {
      if($window.innerWidth < SSFConfigConstants.SSFDirectives.contentWidth) {
        return {
          width: $window.innerWidth + 'px',
          margin: 'auto',
          height: '100%',
          top: '0%',
          right: '0%',
          bottom: '0%',
          left: '0%'
        };
      } else {
        return {
          width: SSFConfigConstants.SSFDirectives.contentWidth + 'px',
          margin: 'auto',
          height: '100%',
          top: '0%',
          right: '0%',
          bottom: '0%',
          left: '0%'
        };
      }
    };

  }
])

.directive('resize', ["$window", "SSFConfigConstants", '$rootScope',
        function ($window, SSFConfigConstants, $rootScope) {
    
    return function (scope, element) {
        scope.$watch($window.innerWidth, function (newValue, oldValue) {        
            scope.style = function () {
                var newWidth;        
                if($window.innerWidth < SSFConfigConstants.SSFDirectives.contentWidth) {
                    newWidth = {
                        'width': "",
                        'position': "",
                        "transform": "",
                        'left': ''
                    };
                }
                else if(!ionic.Platform.isWebView()){
                    newWidth = {
                        'width': SSFConfigConstants.SSFDirectives.contentWidth + "px",
                        'position': "fixed",
                        'transform': "translateX(-50%)",
                        'left':'50%'
                    };
                }
                return newWidth;
            };
        }, true);
        angular.element($window).bind('resize', function () {
            scope.$apply();
        });
    };
}])
.directive('ssfSideMenu', ['SSFConfigConstants', '$window', '$ionicPlatform',
    function(SSFConfigConstants, $window, $ionicPlatform) {
  return function(scope, element) {
    scope.ssfSideMenu = function() {
      //anything saying 'first' is related to the main content
      //anything saying 'last' is related to the side menu content
      //examples: 'firstElementChild', 'firstWidth'
      var firstWidth;
      
      if($window.innerWidth < SSFConfigConstants.SSFDirectives.contentWidth) {
        element[0].parentNode.offsetParent.lastElementChild.style.setProperty('width', '');
      }
      else if(!ionic.Platform.isWebView()){
        firstWidth = SSFConfigConstants.SSFDirectives.contentWidth - element[0].parentNode.offsetParent.lastElementChild.offsetWidth;
      }
      element[0].parentNode.offsetParent.firstElementChild.style.setProperty('width', firstWidth + 'px');
    };
  };
}]);
