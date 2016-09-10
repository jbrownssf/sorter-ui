/*global ble, angular*/
angular.module('starter.services')
    .service('BleServ', ['SSFAlertsService', '$rootScope',
        function(SSFAlertsService, $rootScope) {
            var BleServ = this;

            BleServ.connect = function(parameters, callback) {
                var template =
                    '<div class="card list padding>' +
                    '<div ng-click="closeEmployerPopover(device)" class="item item-text-wrap" ng-repeat="device in BleServ.devices">' +
                    '{{device}}' +
                    '</div>' +
                    '</div>';

                parameters.scope.BleServ = {};
                parameters.scope.BleServ.devices = [];

                // skeleton of how it looks
                // parameters.scope.BleServ.content = {
                //     id: '',
                //     rssi: '',
                //     advertising: {
                //         kCBAdvDataServiceUUIDs: [],
                //         kCBAdvDetailsConnectable: true
                //     }
                // };

                $rootScope.$broadcast('loading:show');
                ble.startScan([], function(device) {
                    parameters.scope.BleServ.devices.push(device);
                }, function(err) {
                    alert('err hit');
                    // alert(JSON.stringify(err));
                });

                setTimeout(ble.stopScan, 3000, function() {
                    SSFAlertsService.showModal({
                        scope: parameters.scope,
                        title: "Connect Bluetooth",
                        body: template
                    }, function(err, suc) {
                        if(err)
                            return callback(err, suc);
                        ble.connect(suc.id);
                    });
                    $rootScope.$broadcast('loading:hide');
                }, function() {
                    $rootScope.$broadcast('loading:hide');
                    alert("stopScan failed");
                });

                parameters.scope.BleServ.connect = function(device) {
                    ble.connect(device.deviceId, function(suc) {
                        alert(JSON.stringify(suc));
                    }, function(err) {
                        alert('failed' + JSON.stringify(err));
                    });
                };

                parameters.scope.BleServ.disConnect = function(device) {
                    ble.disconnect(device.deviceId, function(suc) {
                        alert(JSON.stringify(suc));
                    }, function(err) {
                        alert('failed' + JSON.stringify(err));
                    });
                };
            };
        }
    ]);