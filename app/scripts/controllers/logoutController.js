'use strict';

angular.module('sbAdminApp')
  .controller('LogoutCtrl',
     function($window, $scope, $http, AuthService, Config) {
     
     AuthService.logout();
     var url = "http://" + $window.location.host + "/#/login";
        $window.location.href = url;
     
     setTimeout(function() {
             $scope.$emit('LogoutCtrl');
     }, 0);
  });
     
     
  