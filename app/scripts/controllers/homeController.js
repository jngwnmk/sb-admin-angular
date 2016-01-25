'use strict';
angular.module('sbAdminApp')
  .controller('HomeCtrl',
     function($window, $scope, $http, AuthService) {
     
     $scope.isPaid = AuthService.currentUser().paid;
     $scope.cellphone = AuthService.currentUser().cellphone;
     $scope.username = AuthService.currentUser().username;
     $scope.position = AuthService.currentUser().position;
     $scope.organization = AuthService.currentUser().organization;
     $scope._id = AuthService.currentUser()._id;
     
     console.log("paid : " + $scope.isPaid);
     setTimeout(function() {
             $scope.$emit('HomeCtrl');
     }, 0);
  });
     
     
  