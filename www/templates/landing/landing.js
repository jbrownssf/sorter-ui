/*global OCRAD*/
angular.module('starter.controllers', [])
.controller('LandingCtrl', ['$scope', 'SSFAlertsService', '$state',
        function($scope, SSFAlertsService, $state) {
    
    $scope.openCatalog = function() {
        $state.go('app.cat-home');
    };
    
    // $scope.runTest = function() {
    //     alert(JSON.stringify($cordovaBLE.startScan));
    //     $cordovaBLE.startScan([],{ 
    //         reportDuplicates: true
    //     }, function(device) {
    //         alert("worked " + JSON.stringify(device));
    //     }, function(err) {
    //         alert("failed " + JSON.stringify(err));
    //     });
    
    //     setTimeout($cordovaBLE.stopScan, 5000, function() {
    //         alert("Scan complete");
    //     }, function() {
    //         alert("stopScan failed");
    //     });
    // };
    
}]);
// angular.module('starter.controllers')
// .controller('LandingCtrl', ['$scope', '$http', 'SSFAlertsService', 'SSFCameraService',
//         '$cordovaCamera', '$jrCrop',
//         function($scope, $http, SSFAlertsService, SSFCameraService, $cordovaCamera,
//         $jrCrop) {
//     // var sample = document.getElementById('imageTest');
    
    
//     // var changeImg = document.getElementById('imageTest');
//     $scope.doRefresh = function() {
//         $scope.$broadcast('scroll.refreshComplete');
//     };
    
//     $scope.imageText = 'not done yet';
//     $scope.imageSrc = '';
    
//     $scope.takePicture = function() {
//         var options = {
//             quality: 80,
//             destinationType: Camera.DestinationType.DATA_URL,
//             sourceType: Camera.PictureSourceType.CAMERA,
//             allowEdit: false,
//             correctOrientation: true,
//             encodingType: Camera.EncodingType.JPEG,
//             popoverOptions: CameraPopoverOptions,
//             saveToPhotoAlbum: false
//         };
        
//         $cordovaCamera.getPicture(options)
//         .then(function(imageData) {
//             $jrCrop.crop({
//                 url: "data:image/jpeg;base64," + imageData,
//                 width: 130,
//                 height: 10
//             })
//             .then(function(canvas) {
//                 var changeImg = document.getElementById('imageTest');
//                 changeImg.src = canvas.toDataURL();
//                 var start = new Date();
//                 changeImg.onload = function() {
//                     OCRAD(changeImg, function(text) {
//         				document.getElementById('transcription').innerText = text;
//         				var end = new Date() - start;
//                         alert("This took " + Math.round(end / 1000) + " seconds to finish.");
//                     });
//                 };
//                 // success!
//             }, function() {
//                 // User canceled or couldn't load image.
//             });
//         }, function(err) {
//             // error
//         });
        
//     };
    
    
    
    
//     // $scope.takePicture = function() {
//     //     SSFCameraService.getPicture()
//     //     .then(function(res) {
//     //         var changeImg = document.getElementById('imageTest');
//     //         $jrCrop.crop({
//     //             url: "data:image/jpeg;base64," + res.toDataURL(),
//     //             width: 130,
//     //             height: 10
//     //         }).then(function(canvas) {
//     //             // success!
//     //             alert('Success crop!');
//     //             changeImg.src = canvas.toDataURL();
//     //         //     var start = new Date();
//     //         //     changeImg.onload = function() {
//     //         //         OCRAD(changeImg, function(text) {
//     //     				// document.getElementById('transcription').innerText = text;
//     //     				// var end = new Date() - start;
//     //         //             alert("This took " + Math.round(end / 1000) + " seconds to finish.");
//     //         //         });
//     //         //     };
//     //         }, function() {
//     //             alert('Failed crop!');
//     //             // User canceled or couldn't load image.
//     //         });
//     //     });
        
        
//     //     /*
//     //     SSFCameraService.getPicture()
//     //     .then(function(res) {
//     //         // alert(res);
//     //         var img = new Image();
//     //         img.src = res;
//     //         var changeImg = document.getElementById('imageTest');
//     //         changeImg.src = res;
//     //         // $scope.imageSrc = res;
//     //         img.onload = function(){
// 				// document.getElementById('transcription').innerText = "Recognizing...";
// 				// var start = new Date();
// 				//  jrCrop code 
				
				
// 				//  OCRAD code 
//     // //             OCRAD(img, function(text) {
// 				// // 	document.getElementById('transcription').innerText = text;
// 				// // 	var end = new Date() - start;
//     // //                 alert("This took " + Math.round(end / 1000) + " seconds to finish.");
//     // //             });
//     //         };
//     //         $scope.$apply();
//     //         alert('hit');
//     //     });
//     //     */
//     // };
// }]);