'use strict';

angular.module('sbAdminApp')
  .controller('SurveyTmpCtrl', function($scope, $http) {
     
     
     
     $http.
      get('https://followus-jngwnmk.c9users.io/api/v1/surveyTemplate').
      success(function(data) {
      
      console.log(data);
        $scope.surveytemplates = data.surveytemplates;
      
    });

    setTimeout(function() {
      $scope.$emit('SurveyTmpCtrl');
    }, 0);
   });
  