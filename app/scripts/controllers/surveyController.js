'use strict';

angular.module('sbAdminApp')
  .controller('SurveyCtrl',function($scope,$http,$stateParams,Base64){
    console.log($stateParams.userid);
    
        $scope.answerlist = {};
        $scope.username = "";
        var encoded = 'Basic ' + Base64.encode('010-2222-2222' + ':' + '2222');
        console.log(encoded);
        $http(
         { 
          method: 'GET', 
          url: 'https://followus-jngwnmk.c9users.io/api/v1/user/'+$stateParams.userid, 
          headers: {
           'Authorization': encoded
          }
         }
        ).success(function(data) 
            {
            
                console.log(data);
                $scope.username = data.user.username;
                var type = data.user.surveytype;
                $http.
                get('https://followus-jngwnmk.c9users.io/api/v1/surveyTemplate/'+type).
                success(function(data) {
      
                    console.log(data);
                    $scope.surveytemplate = data.surveytemplate;
                    
                    
                });
                
               
            } 
            
        );
    
    
    
    $scope.submitAnswer = function(){
      console.log($scope.answerlist);
    }
    
    $scope.replaceDesc = function(desc){
        return desc.replace('{USER}', $scope.username);
    };
    
    setTimeout(function() {
                        $scope.$emit('SurveyCtrl');
                    }, 0);
    
   
  });
  