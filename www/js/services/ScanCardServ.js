angular.module('starter.services')
.service('ScanCardServ', ['$cordovaCamera', '$jrCrop',
        function($cordovaCamera, $jrCrop) {
    
    var ScanCardServ = this;
    
    ScanCardServ.scanCard = function(cameraOptions, cb) {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            correctOrientation: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        
        $cordovaCamera.getPicture(options)
        .then(function(imageData) {
            $jrCrop.crop({
                url: "data:image/jpeg;base64," + imageData,
                width: 120,
                height: 10
            })
            .then(function(canvas) {
                
                var changeImg = new Image();
                changeImg.src = canvas.toDataURL();
                
                changeImg.onload = function() {
                    OCRAD(changeImg, function(text) {
                        cb(0,{
                            nameImage: canvas.toDataURL(),
                            nameString: text.trim(),
                            setImage: '',
                        });
                    }, function(err) {
                        cb('reading the text on your image.');
                    });
                };
            }, function() {
                cb("cropping the image.");
            });
        }, function(err) {
            cb('taking the picture.');
        });
    };
    
}]);