'use strict';

angular.module('sbAdminApp')
  .controller('ExcelCtrl', function($window,$scope, $http, Base64, AuthService, Config) {
     
     $scope.userTotalNum = 0 ;
     $scope.userPaidNum = 0;
     
    if(AuthService.isLoggedIn()){
        console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
        var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
        
        $http(
             { 
              method: 'GET', 
              url: Config.getURL()+'api/v1/info', 
              headers: {
               'Authorization': encoded
              }
             }
        ).success(function(info) {
            $scope.userTotalNum = info.total;
            $scope.userPaidNum = info.paid;
        });
        
    }
    
    $scope.surveyDown = function(){
          console.log('surveyDown');
          if(AuthService.isLoggedIn()){
                console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
                var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
                
                $http(
                     { 
                      method: 'GET', 
                      url: Config.getURL()+'api/v1/userlist', 
                      headers: {
                       'Authorization': encoded
                      }
                     }
                ).success(function(users) {
                    console.log('surveyDown success : ' +users.users);
                    
                    var filenames = [];
                    var exportUrls = [];
                    for(var i = 0 ; i < users.users.length ; ++i){
                        var exportUrl = Config.getURL() + 'api/v1/exportByUser/'+users.users[i]._id;
                        var filename = users.users[i].username+'('+users.users[i].cellphone+').csv';
                        exportUrls.push(exportUrl);
                        filenames.push(filename);
                    }
                    
                    for(var i = 0 ; i < filenames.length ; ++i){
                          $http({method: 'GET', url: exportUrls[i]}).
                              success(function(data, status, headers, config) {
                                 
                                 var anchor = angular.element('<a/>');
                                 anchor.attr({
                                     href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
                                     target: '_blank',
                                     download : filenames[i]
                                 })[0].click();
                            
                              }).
                              error(function(data, status, headers, config) {
                                // if there's an error you should see it here
                              });    
                    }
                      
                    
                    
                    
                });
          }
    };
    
    $scope.userDown = function(){
        var exportUrl = Config.getURL() + 'api/v1/exportUser';
        var filename = 'userlist.csv';
                        
        $http({method: 'GET', url: exportUrl}).
                              success(function(data, status, headers, config) {
                                 
                                 var anchor = angular.element('<a/>');
                                 anchor.attr({
                                     href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
                                     target: '_blank',
                                     download : filename
                                 })[0].click();
                            
                              }).
                              error(function(data, status, headers, config) {
                                // if there's an error you should see it here
                              });
    };

     setTimeout(function() {
             $scope.$emit('ExcelCtrl');
      }, 0);
    
   });
  