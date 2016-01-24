'use strict';

angular.module('sbAdminApp')
  .controller('SurveyTmpDetailCtrl',function($scope,$http,$stateParams, Config){
    console.log($stateParams.type);
    
    $scope.answerlist = {};
    
    $http.
      get(Config.getURL()+'api/v1/surveyTemplate/'+$stateParams.type).
      success(function(data) {
      
        console.log(data);
        $scope.surveytemplate = data.surveytemplate;
      
      });
    
    $scope.submitAnswer = function(){
      console.log($scope.answerlist);
    }
    
    $scope.replaceDesc = function(desc){
        return desc.replace('{USER}', '김철수 지점장');
    };
    
    setTimeout(function() {
      $scope.$emit('SurveyTmpDetailCtrl');
    }, 0);
  });
  