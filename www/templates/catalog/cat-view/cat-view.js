angular.module('starter.controllers')
.controller('CatViewCtrl', ['$scope', '$state', '$http', 'CatalogServ', '$ionicActionSheet',
        '$timeout', 'SSFAlertsService', '$cordovaCamera', '$jrCrop', 'ScanCardServ',
        'MatchingServ', '$ionicListDelegate',
        function($scope, $state, $http, CatalogServ, $ionicActionSheet, $timeout,
        SSFAlertsService, $cordovaCamera, $jrCrop, ScanCardServ, MatchingServ,
        $ionicListDelegate) {
    
    $scope.listCanSwipe = true;
    function takePicture(limboCard) {
        ScanCardServ.scanCard({}, function(err, limboCard) {
            if(err) return SSFAlertsService.showAlert('Error', 'Something when wrong with ' + err);
            // otherwise, handle res
            MatchingServ.checkCard(limboCard.nameString, function(err, suc) {
                if(err) {
                    //Could not find the specific card
                    limboCard.nameSuggestions = err;
                    limboCard.setCode = 'BNG';
                    // alert(JSON.stringify(limboCard));
                    CatalogServ.addLimboCard(limboCard);
                } else {
                    CatalogServ.addCard('BNG', suc.multiverseid, suc.nameString, suc.imageUrl);
                    $scope.cards = CatalogServ.getCards();
                }
            });
        });
    }
    function submitName(submittedName) {
        var limboCard = {nameString: submittedName};
        MatchingServ.checkCard(limboCard.nameString, function(err, suc) {
            if(err) {
                //Could not find the specific card
                limboCard.nameSuggestions = err;
                limboCard.setCode = 'BNG';
                CatalogServ.addLimboCard(limboCard);
            } else {
                CatalogServ.addCard('BNG', suc.multiverseid, suc.nameString, suc.imageUrl);
                $scope.cards = CatalogServ.getCards();
            }
        });
    }
    $scope.viewImage = function(imgUrl, cardName) {
        SSFAlertsService.showModal({
            scope: $scope,
            title: cardName,
            body: "<img width=\"100%\" src=\"" + imgUrl + "\">",
            dragClose: true
        }, function(err, suc) {
            
        });
    };
    $scope.show = function() {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Use Scanner' },
                { text: 'Type Name' }
            ],
            // destructiveText: 'Delete',
            titleText: 'Modify your Catalog',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                switch(index) {
                    case 0: //'Use Scanner'
                        takePicture();
                        break;
                    case 1:
                        SSFAlertsService.showPrompt('Enter Name', 'Remember that set matters.')
                        .then(function(res) {
                            if(res) submitName(res);
                        });
                        break;
                }
                return true;
            }
        });
    };
    $scope.doRefresh = function() {
        $scope.cards = CatalogServ.getCards();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.cards = CatalogServ.getCards();
    $scope.removeCard = function(setName, cardId) {
        $scope.cards = CatalogServ.removeCard(setName, cardId);
    };
    $scope.addCard = function(cardName) {
        submitName(cardName);
        $scope.cards = CatalogServ.getCards();
    };
}]);