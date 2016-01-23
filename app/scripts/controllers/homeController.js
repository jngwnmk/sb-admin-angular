'use strict';
angular.module('sbAdminApp')
  .controller('HomeCtrl',
     function($window, $scope, $http, AuthService) {
     
     $scope.isPaid = AuthService.currentUser().paid;
     console.log("paid : " + $scope.isPaid);
     setTimeout(function() {
             $scope.$emit('HomeCtrl');
     }, 0);
  });
     
     
  