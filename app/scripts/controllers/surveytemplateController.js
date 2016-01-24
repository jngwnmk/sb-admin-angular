'use strict';

angular.module('sbAdminApp')
  .controller('SurveyTmpCtrl', function($scope, $http, Config) {
     
     
     
     $http.
      get(Config.getURL()+'api/v1/surveyTemplate').
      success(function(data) {
      
      console.log(data);
        $scope.surveytemplates = data.surveytemplates;
      
    });

    setTimeout(function() {
      $scope.$emit('SurveyTmpCtrl');
    }, 0);
   });
  