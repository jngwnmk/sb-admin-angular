'use strict';

angular.module('sbAdminApp')
  .controller('SurveyTmpDetailCtrl',function($scope,$http,$stateParams){
    console.log($stateParams.type);
    
    $scope.answerlist = {};
    
    $http.
      get('https://followus-jngwnmk.c9users.io/api/v1/surveyTemplate/'+$stateParams.type).
      success(function(data) {
      
        console.log(data);
        $scope.surveytemplate = data.surveytemplate;
      
      });
    
    $scope.submitAnswer = function(){
      console.log($scope.answerlist);
    }
    
    setTimeout(function() {
      $scope.$emit('SurveyTmpDetailCtrl');
    }, 0);
  });
  