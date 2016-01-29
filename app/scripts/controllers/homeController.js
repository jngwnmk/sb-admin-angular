'use strict';
angular.module('sbAdminApp')
  .controller('HomeCtrl',
     function($window, $scope, $http, AuthService, Base64, Config) {
     
     $scope.introduction = "";
     $scope.introduction_prev = "";
     if(AuthService.isLoggedIn()){
        $scope.isPaid = AuthService.currentUser().paid;
        $scope.cellphone = AuthService.currentUser().cellphone;
        $scope.username = AuthService.currentUser().username;
        $scope.position = AuthService.currentUser().position;
        $scope.organization = AuthService.currentUser().organization;
        $scope._id = AuthService.currentUser()._id;
        $scope.introduction = AuthService.currentUser().introduction;
        $scope.introduction_prev = AuthService.currentUser().introduction;
     } else {
        $window.location.href = '/#/login';
     }
     
     $scope.editIntro = function(){
          if(AuthService.isLoggedIn()){
            console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
            var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
            console.log("edit introduction");
            var user = {
                data : {
                     cellphone : $scope.cellphone,
                     introduction : $scope.introduction,
                     origin : AuthService.currentUser().cellphone
                }
            };
            
            console.log(user);
            $http(
                {
                    method : 'PUT',
                    url : Config.getURL()+'api/v1/introMsgChange',
                    headers: {
                        'Authorization': encoded
                    },
                    data  : user
                }
            ).
            success(function(data, status) {
                    console.log(data);
                    window.alert('인사말수정 완료.');
                    
            });
          }
     };
     
     $scope.editIntroCancel = function(){
          console.log("edit introduction cancel");
          $scope.introduction = $scope.introduction_prev;
     };
     
     $scope.copyIntro = function(){
          console.log("copy intro");
     };
     
     setTimeout(function() {
             $scope.$emit('HomeCtrl');
     }, 0);
  });
     
     
  