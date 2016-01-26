'use strict';

angular.module('sbAdminApp')
  .controller('UserAddCtrl', function($window,$scope, $http, Base64, AuthService, Config) {
     
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'ap-northeast-1:5a6fcdaf-d17b-4d7f-af1f-844fc3ee5562',
      });
      AWS.config.region = 'ap-northeast-1';
     
     
        $scope.paid = 'false';
        $scope.surveytype = 'NEW';
        $scope.username = '';
        $scope.add_new_cellphone='';
        $scope.add_new_pwd='';
        $scope.position = '';
        $scope.organization = '';
        
     $scope.registerUser = function()
     {
        
        
    if(AuthService.isLoggedIn()){
        console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
        var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
      
        console.log("registerUser()");
        
        var filter = function(paid){
            if(paid=='false'){
                return false;
            } else {
                return true;
            }
        }
        
        var user = {
            user : {
                username : $scope.username,
                 usertype : 'USER',
                 cellphone : $scope.add_new_cellphone,
                 pwd : $scope.add_new_pwd,
                 position : $scope.position,
                 surveytype : $scope.surveytype,
                 organization : $scope.organization,
                 introduction : "introduction",
                 photo : 'http://test.com',
                 paid : filter($scope.paid)
            }
        };
        
        console.log(user);
        $http(
            {
                method : 'POST',
                url : Config.getURL()+'api/v1/register',
                headers: {
                    'Authorization': encoded
                },
                data  : user
            }
        ).
        success(function(newuser, status) {
                console.log(newuser);
                if(newuser!=null){
                    var bucket = new AWS.S3({params: {Bucket: 'followus-img-backup'}});
                    var fileChooser = document.getElementById('file-chooser');
                    var file = fileChooser.files[0];
                    var results = document.getElementById('results');
                    if(fileChooser.files.length!=0){
                        results.innerHTML = '';
                        console.log("user._id:"+newuser._id);
                        var params = {Key: newuser._id+".jpg", ContentType: file.type, Body: file};
                            bucket.upload
                            (params, 
                                function (err, data) 
                                    {
                                        results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
                                        if(!err){
                                            newuser.photo = "https://s3-ap-northeast-1.amazonaws.com/followus-img-backup/"+newuser._id+".jpg";
                                            console.log(newuser);
                                            $http(
                                                {
                                                    method : 'PUT',
                                                    url : Config.getURL()+'api/v1/changeUserPhoto/'+newuser._id,
                                                    headers: {
                                                        'Authorization': encoded
                                                    }
                                                }
                                            ).
                                            success(function(data, status) {
                                                
                                                $window.location.href = '/#/dashboard/table2';      
                                            });
                                        } else {
                                              window.alert('사진 등록 실패');
                                        }
                                        
                                    }
                            );
                    } else {
                        $window.location.href = '/#/dashboard/table2'; 
                    }
                            //  results.innerHTML = 'Nothing to upload.';
                    
                } else {
                    window.alert('등록 실패');
                }
                
        });
        };
     }
     
     $scope.test = "test";
     
     setTimeout(function() {
             $scope.$emit('UserAddCtrl');
      }, 0);
    
   });
  