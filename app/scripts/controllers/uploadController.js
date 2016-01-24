'use strict';

angular.module('sbAdminApp')
  .controller('UploadCtrl', function($window,$scope, $http, Config) {
    
    $scope.aws_access_key = "";
    $scope.aws_secret_key = "";
    $http(
            {
                method : 'GET',
                url : Config.getURL()+'api/v1/s3policy'
            }
        ).
        success(function(data, status) {
            console.log(data);
            
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'ap-northeast-1:5a6fcdaf-d17b-4d7f-af1f-844fc3ee5562',
            });
            AWS.config.region = 'ap-northeast-1';
            var bucket = new AWS.S3({params: {Bucket: 'followus-img-backup'}});

              var fileChooser = document.getElementById('file-chooser');
              var button = document.getElementById('upload-button');
              var results = document.getElementById('results');
              button.addEventListener('click', function() {
                var file = fileChooser.files[0];
                if (file) {
                  results.innerHTML = '';
            
                  var params = {Key: file.name, ContentType: file.type, Body: file};
                  bucket.upload(params, function (err, data) {
                    results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
                  });
                } else {
                  results.innerHTML = 'Nothing to upload.';
                }
              }, false);
            
    });
    
     setTimeout(function() {
             $scope.$emit('UploadCtrl');
      }, 0);
    
});
  
  
  