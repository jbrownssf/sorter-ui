/*
Instructions:
1.  Inject 'SSFCamera' into the app.js file.
2.  Place '<script src="js/SSFServices/SSFCamera.js"></script>' into the index.html
            file above the app.js
3.  If you have already installed ngCordova, skip to #8
4.  Terminal: cd <project-name>
5.  Terminal: bower install ngCordova
6.  Inject 'ngCordova' in your app.js file
7.  Terminal: npm install ionic-platform-web-client
8.  Terminal: cordova plugin add cordova-plugin-camera
9.  Be sure that the following line is not commented out:
            <script src="cordova.js"></script>
10. Check to make sure that the package.json has the following line inside of the
            cordova plugins in it: "cordova-plugin-camera"
*/

angular.module('SSFCamera', [])
.service('SSFCameraService', ['$cordovaCamera',
        function($cordovaCamera) {
    var SSFCameraService = this,
    defaultOptions,
    customOptions = {};
    function setOptions(options) {
        if(defaultOptions) {
            defaultOptions = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL, 
                sourceType: Camera.PictureSourceType.CAMERA, 
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
        }
        var tempOptions;
        if(options) {
            tempOptions = defaultOptions;
            for(var i in options) {
                tempOptions[i] = options[i];
            }
            return tempOptions;
        }
        return defaultOptions;
    }
    
    SSFCameraService.getPicture = function(options) {
        return $cordovaCamera.getPicture(setOptions(options))
        .then(function(imageData) {
            // return "data:image/jpeg;base64," + imageData;
            return imageData;
        },function(err) {
            alert('failed' + JSON.stringify(err));
            return false;
            // An error occured. Show a message to the user
        });
    };
    
}]);