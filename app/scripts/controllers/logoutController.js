'use strict';

angular.module('sbAdminApp')
  .controller('LogoutCtrl',
     function($window, $scope, $http, AuthService, Config) {
     
     AuthService.logout();
     $window.location.href = '/#/login';
     
     setTimeout(function() {
             $scope.$emit('LogoutCtrl');
     }, 0);
  });
     
     
  