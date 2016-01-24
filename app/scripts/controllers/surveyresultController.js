'use strict';

angular.module('sbAdminApp')
  .controller('SurveyResultCtrl',function($scope,$http,$stateParams,AuthService,Base64,Config){
        
        $scope.username = "";
        $scope.total = 0;
        
        if(AuthService.isLoggedIn()){
            console.log(AuthService.currentUser().cellphone + " : " +AuthService.getPwd());
            var encoded = 'Basic ' + Base64.encode(AuthService.currentUser().cellphone + ':' + AuthService.getPwd());
            console.log(encoded);
            
            $scope.username = $stateParams.username;
            
           
            
            //Survey Result
            $http(
             { 
              method: 'GET', 
              url: Config.getURL()+'api/v1/surveyResult/'+$stateParams.id, 
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
    
    
    $scope.replaceDesc = function(desc){
        return desc.replace(/{USER}/gi, $scope.username);
    };
    
    setTimeout(function() {
                        $scope.$emit('SurveyResultCtrl');
                    }, 0);
    
   
  });
  