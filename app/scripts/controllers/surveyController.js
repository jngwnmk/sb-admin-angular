'use strict';

angular.module('sbAdminApp')
  .controller('SurveyCtrl',function($q,$scope,$http,$stateParams,$window, Base64, Config){
    console.log($stateParams.userid);
    
        $scope.answerlist = {};
        $scope.etclist = {};
        $scope.etcvalue = {};
        $scope.username = "";
        $scope.type = "";
        $scope.isValidImg = true;
        $scope.suffix_1 = "";
        $scope.suffix_2 = "";
        $scope.suffix_3 = "";
        $scope.suffix_4 = "";
        $scope.introduction = "";
        $scope.surveytemplate = {};
        //To allow access for public, use admin's info for Authorization
        //010-2222-2222 는 슈퍼 어드민
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
                $scope.suffix_1 = data.user.suffix_1;
                $scope.suffix_2 = data.user.suffix_2;
                $scope.suffix_3 = data.user.suffix_3;
                $scope.suffix_4 = data.user.suffix_4;
                $scope.introduction = data.user.introduction;
                if($scope.photo==''){
                    $scope.isValidImg = false;
                } else {
                    $scope.isValidImg = true;
                }
                $http.
                get(Config.getURL()+'api/v1/surveyTemplate/'+$scope.type).
                success(function(data) {
      
                    console.log(data);
                    $scope.surveytemplate = data.surveytemplate;
                    $scope.question_num = $scope.surveytemplate.questions.length; 
                });
                
               
            } 
            
        );
    
    
    $scope.submitAnswer = function(){
        
        console.log($scope.answerlist);
        var answers = {};
        
        $scope.combined = {};
        for(var key in $scope.answerlist){
            if($scope.surveytemplate.questions[key-1].type=='SELECT'){
                if($scope.isEtc($scope.answerlist[key],key)){
                    $scope.combined[key] = $scope.answerlist[key] +":"+ $scope.etcvalue[key];
                } else {
                    $scope.combined[key] = $scope.answerlist[key];
                }    
            } else {
                $scope.combined[key] = $scope.answerlist[key];
            }
            
        }
        
        for(var idx = 1 ; idx <= $scope.question_num ; ++idx){
            if(!$scope.combined.hasOwnProperty(idx)){
                $scope.combined[idx] = "";
            }
        }
        
        answers['answers'] =$scope.combined;
        console.log(answers);
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
            $window.close();
      });  
      
    };
    
    $scope.selectRadio = function(no){
        console.log("Select radio : "+no);
        if($scope.isEtc($scope.answerlist[no],no)){
            console.log("ETC true");
            $scope.etclist[no] =  true;
        } else {
            console.log("ETC false");
            $scope.etclist[no] = false;
        }
    }
    
    $scope.replaceDesc = function(desc){
         return desc.replace(/{USER}/gi, $scope.username)
                   .replace(/{POSITION}/gi, $scope.position)
                   .replace(/{SUFFIX1}/gi,$scope.suffix_1)
                   .replace(/{SUFFIX2}/gi,$scope.suffix_2)
                   .replace(/{SUFFIX3}/gi,$scope.suffix_3)
                   .replace(/{SUFFIX4}/gi,$scope.suffix_4);    };
    
    $scope.keypressHandler = function(event, nextIdx){
        if(event.keyCode == 13){
            angular.element(
                document.querySelector('#f_'+(nextIdx+1)))[0].focus();
            
            event.preventDefault();
            return;                    
        }
    };
    
    
    $scope.keypressHandlerForButton = function(event){
        if(event.keyCode == 13){
            angular.element(
                document.querySelector('#f_'+(nextIdx+1)))[0].focus();
            
            event.preventDefault();
            return;                       
        }
    };
    
    $scope.isEtc = function(option,no){
        
        if ($scope.surveytemplate.questions[no-1].answer.options[option[0]-1].isEtc) {
            return true;  
        } else {
            return false;
        }
    }
    
    
    
    
    setTimeout(function() {
                        $scope.$emit('SurveyCtrl');
                    }, 0);
    
   
  });
  