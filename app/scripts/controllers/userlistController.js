'use strict';

angular.module('sbAdminApp')
  .controller('UserListCtrl', function($scope, $http, Base64, AuthService, Config) {
     
     var lastid = "";
     var firstid = "";
     $scope.hasPrev = false;
     $scope.hasNext = false;
     
      if(AuthService.isLoggedIn()){
        console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
        var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
        console.log(encoded);
        $http(
         { 
          method: 'GET', 
          url: Config.getURL()+'api/v1/user', 
          headers: {
           'Authorization': encoded
          }
         }
        ).success(function(data) {
            
            console.log(data);
            $scope.users = data.users;
            if(data.users.length>=1){
              firstid = data.users[0]._id;
              lastid = data.users[data.users.length-1]._id;
              console.log('first is '+data.users[0].username);
              console.log('last is '+data.users[data.users.length-1].username);
            }
            
            $scope.hasPrev = false;
            $scope.hasNext = true;
            
            //$http.get('https://followus-jngwnmk.c9users.io/api/v1/user/total').success(function(data) {
              //  console.log(data);
            //});
        } 
      ); //end of success
    }//end of if
    
    $scope.checkPaid =function(isPaid){
        if(isPaid){
            return '결제완료';
        } else {
            return '미결제';
        }
    }
    
    $scope.prev =function(){
      if(AuthService.isLoggedIn()){
          console.log("prev");
          
          console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
          var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
          console.log(encoded);
          $http(
           { 
            method: 'GET', 
            url: Config.getURL()+'api/v1/user/prev/'+firstid, 
            headers: {
             'Authorization': encoded
            }
           }
          ).success(function(data) {
                console.log(data);
                ///data.users.sort(function(a, b) {
                  //return parseFloat(a._id) - parseFloat(b._id);
                //});
                if(data.users.length>=1){
                  data.users.reverse();
                  $scope.users = data.users;
                  firstid = data.users[0]._id;
                  lastid = data.users[data.users.length-1]._id;
                  console.log('first is '+data.users[0].username);
                  console.log('last is '+data.users[data.users.length-1].username);
                }
          });
        
         /*$http.
          get('https://followus-jngwnmk.c9users.io/api/v1/user/prev/'+firstid).
          success(function(data) {
          
          console.log(data);
          
          $scope.users = data.users;
          if(data.users.length>=1){
            firstid = data.users[0]._id;
            lastid = data.users[data.users.length-1]._id;
            
          console.log('first is '+data.users[0].username);
          console.log('last is '+data.users[data.users.length-1].username);
          }
    
         });*/ 
        }
      };
     
     $scope.next = function(){
        if(AuthService.isLoggedIn()){
          
                console.log("next");
        
            console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
          var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
          console.log(encoded);
          $http(
           { 
            method: 'GET', 
            url: Config.getURL()+'api/v1/user/next/'+lastid, 
            headers: {
             'Authorization': encoded
            }
           }
          ).success(function(data) {
                console.log(data);
          
               
            if(data.users.length>=1){
              $scope.users = data.users;
              firstid = data.users[0]._id;
              lastid = data.users[data.users.length-1]._id;
              console.log('first is '+data.users[0].username);
              console.log('last is '+data.users[data.users.length-1].username);
            }
          });
          
          
            /*$http.
            get('https://followus-jngwnmk.c9users.io/api/v1/user/next/'+lastid).
            success(function(data) {
            
            console.log(data);
            $scope.users = data.users;
            if(data.users.length>=1){
              firstid = data.users[0]._id;
              lastid = data.users[data.users.length-1]._id;
              
            console.log('first is '+data.users[0].username);
            console.log('last is '+data.users[data.users.length-1].username);
            }
              
          }); */ 
        }
         
     };
     

    setTimeout(function() {
      $scope.$emit('UserListCtrl');
    }, 0);
  
});