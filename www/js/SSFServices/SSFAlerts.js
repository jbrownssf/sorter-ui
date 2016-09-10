angular.module('SSFAlerts', [])
.service('SSFAlertsService', ['$ionicPopup', '$q', '$ionicPopover', '$ionicModal',
        function ($ionicPopup, $q, $ionicPopover, $ionicModal) {
    
    var service = this;
    
    service.showAlert = function(title, body)
    {
        if(navigator.notification === undefined)
        {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: body
            });
            alertPopup.then();
        }else {
            navigator.notification.alert(body, null, title);
        }
    };
    
    service.showConfirm = function(title, body)
    {
        if(navigator.notification == undefined)
        {
            var confirmPopup = $ionicPopup.confirm({
                title: title,
                template: body
            });
            return confirmPopup;
        }else {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex)
            {
                if(buttonIndex===1) {
                    defer.resolve(true);
                }else {
                    defer.resolve(false);
                }
            };
            navigator.notification.confirm(body, confirmCallback, title);
            return defer.promise;
        }
    };
    service.showPrompt = function(title, body)
    {
        if(navigator.notification == undefined)
        {
            var confirmPopup = $ionicPopup.prompt({
                title: title,
                template: body
            });
            return confirmPopup;
        }else {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex)
            {
                if(buttonIndex===1) {
                    defer.resolve(true);
                }else {
                    defer.resolve(false);
                }
            };
            navigator.notification.prompt(body, confirmCallback, title);
            return defer.promise;
        }
    };
    service.showPopup = function($scope, $event, body){
        var template = 
            '<ion-popover-view style="height:auto; width:auto;">' +
                '<ion-content scroll="false" style="position:relative;">' +
                    body +
                '</ion-content>' +
            '</ion-popover-view>';
        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });
        $scope.popover.show($event);
    };
    service.showModal = function(parameters, callback) {
        // {
        //     body: '',
        //     scope: $scope,
        //     title: ''
        // }
        var template = 
            '<ion-modal-view scroll="false">'+
                '<ion-header-bar>'+
                    '<h1 class="title">' + parameters.title + '</h1>'+
                    '<div class="button button-icon button-clear" ng-click="closeModal()"><button class="button-icon icon ion-close-round"></button></div>' +
                '</ion-header-bar>'+
                '<ion-content>';
        template += parameters.dragClose ? 
                    '<ion-refresher on-refresh="closeModal()" pulling-text="Pull to hide...">' +
                    '</ion-refresher>' : '';
        template +=
                    parameters.body +
                '</ion-content>'+
            '</ion-modal-view>';
        
        parameters.scope.chooseEmployer = $ionicModal.fromTemplate(template, {
            scope: parameters.scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        });
        parameters.scope.chooseEmployer.show();
        
        
        parameters.scope.closeEmployerPopover = function(a) {
            parameters.scope.chooseEmployer.remove();
            callback(0, a);
        };
        
        parameters.scope.closeModal = function() {
            parameters.scope.chooseEmployer.remove();
            callback('User closed modal');
        };
    };
}])
;