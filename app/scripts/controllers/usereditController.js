'use strict';

angular.module('sbAdminApp')
  .controller('UserEditCtrl', function($window,$scope, $http, Base64, AuthService, Config) {
     
     
     $scope.username = AuthService.currentUser().username;
     $scope.cellphone = AuthService.currentUser().cellphone;
     $scope.pwd = AuthService.getPwd();
     $scope.position =AuthService.currentUser().position;
     $scope.organization = AuthService.currentUser().organization;
            
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
            success(function(data, status) {
                    console.log(data);
                    window.alert('정보수정을 위해 다시 로그인 합니다.');
                    $window.location.href = '/#/login';
            });
            };
    };
     
     $scope.test = "test";
     
     setTimeout(function() {
             $scope.$emit('UserEditCtrl');
      }, 0);
    
 });
  