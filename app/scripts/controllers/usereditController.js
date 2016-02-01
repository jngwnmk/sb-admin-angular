'use strict';

angular.module('sbAdminApp')
  .controller('UserEditCtrl', function($window,$scope, $http, Base64, AuthService, Config) {
     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'ap-northeast-1:5a6fcdaf-d17b-4d7f-af1f-844fc3ee5562',
      });
      AWS.config.region = 'ap-northeast-1';
     
     if(!AuthService.isLoggedIn()){
         var url = "http://" + $window.location.host + "/#/login";
        $window.location.href = url;
        
     }
     $scope.username = AuthService.currentUser().username;
     $scope.cellphone = AuthService.currentUser().cellphone;
     $scope.pwd = AuthService.getPwd();
     $scope.position =AuthService.currentUser().position;
     $scope.organization = AuthService.currentUser().organization;
     $scope.usePhoto = false;
        
     $scope.editUser = function()
     {
        
        if(AuthService.isLoggedIn()){
            console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
            var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
          
            console.log("editUser()");
            
            
            
            var user = {
                user : {
                     username : $scope.username,
                     cellphone : $scope.cellphone,
                     pwd : $scope.pwd,
                     position : $scope.position,
                     organization : $scope.organization,
                     origin : AuthService.currentUser().cellphone
                }
            };
            
            console.log(user);
            $http(
                {
                    method : 'PUT',
                    url : Config.getURL()+'api/v1/edit',
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
                                                
                                                window.alert('정보수정을 위해 다시 로그인 합니다.');
                                                var url = "http://" + $window.location.host + "/#/login";
                                                $window.location.href = url;
                                            });
                                        } else {
                                              window.alert('사진 등록 실패');
                                        }
                                        
                                    }
                            );
                    }
                 } else {
                    window.alert('등록 실패');
                }
                    
            });
            };
    };
     
     $scope.test = "test";
     
     setTimeout(function() {
             $scope.$emit('UserEditCtrl');
      }, 0);
    
 });
  