'use strict';

angular.module('sbAdminApp')
  .controller('SurveyTmpDetailCtrl',function($scope,$http,$stateParams, AuthService, Base64,Config){
    console.log($stateParams.type);
    
    $scope.answerlist = {};
    $scope.introduction = "";
    $scope.type = "";
    $scope.organization = "{{organization}}";
    $scope.username = "{{username}}";
    $scope.position = "{{position}}";
    $scope.question_num  = "{{question_num}}";
    $scope.introduction_prev = "";
    
    $http.
      get(Config.getURL()+'api/v1/surveyTemplate/'+$stateParams.type).
      success(function(data) {
      
        console.log(data);
        $scope.surveytemplate = data.surveytemplate;
        $scope.introduction = data.surveytemplate.defaultIntro;
        $scope.introduction_prev = data.surveytemplate.defaultIntro;
       
        $scope.type = data.surveytemplate.type;
      });
    
    $scope.submitAnswer = function(){
      console.log($scope.answerlist);
    }
    
    $scope.replaceDesc = function(desc){
        
        return desc.replace(/{USER}/gi, '김철수').replace(/{POSITION}/gi, '지점장')
                    .replace(/{SUFFIX1}/gi,'을').replace(/{SUFFIX2}/gi,'은');
    };
    
    $scope.editIntro = function(){
          if(AuthService.isLoggedIn()){
            console.log("edit introduction");
            var newIntro = {
                introduction : $scope.introduction,
            };
            
            console.log(newIntro);
            $http(
                {
                    method : 'PUT',
                    url : Config.getURL()+'api/v1/surveyTemplate/'+$scope.type,
                    data  : newIntro
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
    
    setTimeout(function() {
      $scope.$emit('SurveyTmpDetailCtrl');
    }, 0);
  });
  