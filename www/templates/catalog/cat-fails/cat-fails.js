angular.module('starter.controllers')
.controller('CatFailsCtrl', ['$scope', '$state', 'CatalogServ', 'SSFAlertsService',
        'MatchingServ',
        function($scope, $state, CatalogServ, SSFAlertsService, MatchingServ) {
    
    
    function establishPage() {
        var tempLimbo = CatalogServ.getLimboCards(),
        limboArray;
        for(var i in tempLimbo) {
            limboArray = [];
            // $scope.items.push(tempLimbo[i]);
            // if(!Array.isArray(tempLimbo[i].nameString)) {
                for(var j in tempLimbo[i].nameSuggestions) {
                    tempLimbo[i].nameSuggestions[j].nameString = j;
                    limboArray.push(tempLimbo[i].nameSuggestions[j]);
                }
                tempLimbo[i].nameSuggestions = limboArray;
            // }
        }
        $scope.items = tempLimbo;
    }
    establishPage();
    
    $scope.doRefresh = function() {
        establishPage();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.selectName = function(parentIndex, limboCard, setCode) {
        SSFAlertsService.showConfirm('Warning', 'Is ' + limboCard.nameString + ' the name you meant to select?')
        .then(function(res) {
            if(res) {
                CatalogServ.removeLimboCard(parentIndex);
                $scope.items.splice(parentIndex, 1);
                CatalogServ.addCard(setCode, limboCard.multiverseid, limboCard.nameString, limboCard.imageUrl);
            }
        });
    };
    $scope.submitName = function(index, submittedName) {
        MatchingServ.checkCard(submittedName, function(err, res) {
            if(err) {
                return SSFAlertsService.showAlert("Error", "The name you entered could not be found in this set. Make sure you spelled it right and it's in the correct set. Case counts.");
            } else {
                CatalogServ.removeLimboCard(index);
                $scope.items.splice(index, 1);
                CatalogServ.addCard('BNG', res.multiverseid, res.nameString, res.imageUrl);
            }
        });
    };
}]);