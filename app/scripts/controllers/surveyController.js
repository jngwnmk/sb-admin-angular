'use strict';

angular.module('sbAdminApp')
  .controller('SurveyCtrl',function($scope,$http,$stateParams,Base64, Config){
    console.log($stateParams.userid);
    
        $scope.answerlist = {};
        $scope.username = "";
        $scope.type = "";
        var encoded = 'Basic ' + Base64.encode('010-2222-2222' + ':' + '2222');
        console.log(encoded);
        $http(
         { 
          method: 'GET', 
          url: Config.getURL()+'api/v1/user/'+$stateParams.userid, 
          headers: {
           'Authorization': encoded
          }
         }
        ).success(function(data) 
            {
            
                console.log(data);
                $scope.username = data.user.username;
                $scope.position = data.user.position;
                $scope.organization = data.user.organization;
                $scope.type = data.user.surveytype;
                $scope.photo = data.user.photo;
                $http.
                get(Config.getURL()+'api/v1/surveyTemplate/'+$scope.type).
                success(function(data) {
      
                    console.log(data);
                    $scope.surveytemplate = data.surveytemplate;
                    $scope.question_num = $scope.surveytemplate.length; 
                });
                
               
            } 
            
        );
    
    
    
    $scope.submitAnswer = function(){
        
        console.log($scope.answerlist);
        var answers = {};
        answers['answers'] =$scope.answerlist;
      $http(
        {
            method : 'POST',
            url : Config.getURL()+'api/v1/survey/'+$stateParams.userid+'/'+$scope.type,
            headers : {
                'Authorization': encoded
            },
            data : answers 
        }
       )    
      .success(function(data) {
            window.alert('설문완료');  
      });  
      
    }
    
    $scope.replaceDesc = function(desc){
        return desc.replace(/{USER}/gi, $scope.username);
    };
    
    setTimeout(function() {
                        $scope.$emit('SurveyCtrl');
                    }, 0);
    
   
  });
  