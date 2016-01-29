'use strict';

angular.module('sbAdminApp')
  .controller('UserSearchCtrl', function($window, $scope,$stateParams, $http, Base64, AuthService, Config) {
        
        $scope.currentUserId = AuthService.currentUser()._id;  
        if(AuthService.isLoggedIn()){
            
            console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
            var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
            console.log(encoded);
            $http(
            { 
              method: 'GET', 
              url: Config.getURL()+'api/v1/user/search/'+$stateParams.keyword, 
              headers: {
               'Authorization': encoded
            }
         }
        ).success(function(data) {
            console.log(data);
            $scope.searchedUser = data.users;
            } 
        ); //end of success
    }//end of if
    else {
        $window.location.href = '/#/login';
    }    
    
    $scope.checkPaid =function(isPaid){
        if(isPaid){
            return '결제완료';
        } else {
            return '미결제';
        }
    };
    
    $scope.changePaidStatus = function(user_cellphone){
        if(AuthService.isLoggedIn()){
          console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
          var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
           
           var user = {
                user : {
                     cellphone : user_cellphone,
                }
            };
          console.log(user);
          $http(
            { 
                method: 'PUT', 
                url: Config.getURL()+'api/v1/changePaidStatus', 
                headers: {
                 'Authorization': encoded
                },
                data  : user
            }
          ).success(function(data) {
                $scope.showController = true;
   
                console.log(data.paid);
            }
          );    
        }
    };
    
    setTimeout(function() {
      $scope.$emit('UserSearchCtrl');
    }, 0);
  
});