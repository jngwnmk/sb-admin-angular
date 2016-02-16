'use strict';

angular.module('sbAdminApp')
  .controller('SurveyResultCtrl',function($window, $scope,$http,$stateParams,AuthService,Base64,Config){
        
        $scope.username = "";
        $scope.total = 0;
        $scope.position = "";
        $scope.suffix_1 = "";
        $scope.suffix_2 = "";
        $scope.suffix_3 = "";
        $scope.suffix_4 = "";
        $scope.organization = "";
        
        if(AuthService.isLoggedIn()){
            console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
            var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
            console.log(encoded);
            
            $scope.username = $stateParams.surveyUserName;
            
            if(AuthService.currentUser().usertype=='ADMIN'){
                
                $http({
                    method : 'GET',
                    url : Config.getURL()+'api/v1/user/searchbyid/'+$stateParams.surveyUserId,
                    headers: {
                        'Authorization': encoded
                    }
                }).success(function(user) {
                    console.log(user);
                    $scope.position = user.user.position;
                    $scope.suffix_1 = user.user.suffix_1;
                    $scope.suffix_2 = user.user.suffix_2;
                    $scope.suffix_3 = user.user.suffix_3;
                    $scope.suffix_4 = user.user.suffix_4;
                    $scope.organization = user.user.organization;
                });
                
            } else {
                $scope.position = AuthService.currentUser().position;
                $scope.suffix_1 = AuthService.currentUser().suffix_1;
                $scope.suffix_2 = AuthService.currentUser().suffix_2;
                $scope.suffix_3 = AuthService.currentUser().suffix_3;
                $scope.suffix_4 = AuthService.currentUser().suffix_4;
                $scope.organization = AuthService.currentUser().organization;
            }
            
            //Survey Result
            $http(
             { 
              method: 'GET', 
              url: Config.getURL()+'api/v1/surveyResult/'+$stateParams.requestUserId+'/'+$stateParams.surveyUserId, 
              headers: {
               'Authorization': encoded
              }
             }
            ).success(function(data) {
                console.log(data);
                
                $scope.surveyresult = data.surveyresult;
                $scope.total = data.surveyresult.length;
                
                if($scope.total==0){
                      window.alert('답변결과가없습니다');  
                } else {
                     //Survey Template
                    $http.
                          get(Config.getURL()+'api/v1/surveyTemplate/'+data.surveyresult[0].surveytype).
                          success(function(data) {
                            console.log(data);
                            $scope.surveytemplate = data.surveytemplate;
                    });    
                }
            } 
          ); //end of success
        }//end of if 
        else {
            var url = "http://" + $window.location.host + "/#/login";
        $window.location.href = url;
        }
    
    $scope.replaceDesc = function(desc){
        return desc.replace(/{USER}/gi, $scope.username)
                   .replace(/{POSITION}/gi, $scope.position)
                   .replace(/{SUFFIX1}/gi,$scope.suffix_1)
                   .replace(/{SUFFIX2}/gi,$scope.suffix_2)
                   .replace(/{SUFFIX3}/gi,$scope.suffix_3)
                   .replace(/{SUFFIX4}/gi,$scope.suffix_4)
                   .replace(/{ORGANIZATION}/gi,$scope.organization);
    };
    
    $scope.surveyDownByUser = function(){
        
        var exportUrl = Config.getURL() + 'api/v1/exportByUser/' + $stateParams.surveyUserId;
        var filename = $scope.username+'.csv';
                        
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
        $scope.$emit('SurveyResultCtrl');
    }, 0);
    
   
  });
  