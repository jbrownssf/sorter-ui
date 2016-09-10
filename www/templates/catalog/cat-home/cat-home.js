angular.module('starter.controllers')
.controller('CatHomeCtrl', ['$scope', '$state', 'BleServ',
        function($scope, $state, BleServ) {
    $scope.viewCatalog = function() {
        $state.go('app.cat-view');
    };
    $scope.manageFails = function() {
        $state.go('app.cat-fails');
    };
    
    // $scope.bleConnect = function(deviceId) {
    //     ble.connect(deviceId, function(suc) {
    //         alert(JSON.stringify(suc));
    //     }, function(err) {
    //         alert('failed' + JSON.stringify(err));
    //     });
    // };
    // $scope.bleDisconnect = function() {
    //     ble.disconnect($scope.devices[0].id, function(suc) {
    //         alert(JSON.stringify(suc));
    //     }, function(err) {
    //         alert('failed' + JSON.stringify(err));
    //     });
    // };
    $scope.devices = [{
        id: 123,
        hello: "world"
    }];
    
    
    $scope.runTest = function() {
        BleServ.connect({
            scope: $scope
        }, function(err, res) {
            
        });
    };
    // $scope.runTest = function() {
    //     $scope.devices = [];
    //     // if(devices.length > 0) $scope.bleDisconnect(devices[0]);
    //     ble.startScan([],function(device) {
    //         $scope.devices.push(device);
    //     }, function(err) {
    //         alert('err hit');
    //         alert(JSON.stringify(err));
    //     });
    
    //     setTimeout(ble.stopScan, 5000, function() {
    //         alert("Scan complete");
    //     }, function() {
    //         alert("stopScan failed");
    //     });
    // };
    
    
}]);