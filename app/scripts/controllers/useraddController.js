'use strict';

angular.module('sbAdminApp')
  .controller('UserAddCtrl', function($window,$scope, $http, Base64, AuthService) {
     
     
     $scope.registerUser = function()
     {
        
    if(AuthService.isLoggedIn()){
        console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
        var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
      
        console.log("registerUser()");
        
        var user = {
            user : {
                username : $scope.username,
                 usertype : 'USER',
                 cellphone : $scope.cellphone,
                 pwd : $scope.pwd,
                 position : $scope.position,
                 surveytype : $scope.surveytype,
                 organization : $scope.organization,
                 introduction : "introduction",
                 photo : 'http://test.com',
                 paid :$scope.paid
            }
        };
        
        console.log(user);
        $http(
            {
                method : 'POST',
                url : 'https://followus-jngwnmk.c9users.io/api/v1/register',
                headers: {
                    'Authorization': encoded
                },
                data  : user
            }
        ).
        success(function(data, status) {
                console.log(data);
                $window.location.href = '/#/dashboard/table2';
                
                /*var result;
                result = JSON.parse(data.text);
                if(result.msg == 'OK'){
                } else {
                    window.alert('등록 실패');
                }*/
        
                
        });
        };
     }
     
     $scope.test = "test";
     
     setTimeout(function() {
             $scope.$emit('UserAddCtrl');
      }, 0);
    
   });
  