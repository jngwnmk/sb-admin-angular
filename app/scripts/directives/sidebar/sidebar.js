'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }])
  .controller('SidebarCtrl',function($scope,AuthService){
	    
	    $scope.user = AuthService.currentUser();
	   
	    $scope.usertype = AuthService.currentUserType();
	    
	    if ($scope.usertype == 'ADMIN'){
	      $scope.isAdmin = true;
	      $scope.isUser = false;
	    } else {
	      $scope.isAdmin = false;
	      $scope.isUser = true;
	    }
	    
	    $scope.getSurveyType = function(type){
	        if(type=='NEW'){
	           return '신입회원';
	        } else if(type=='OLD'){
	            return '기존회원';
	        } else if(type=='MANAGER'){
	            return '관리자';
	        }
	    }
	   
	    setTimeout(function() {
             $scope.$emit('SidebarCtrl');
        }, 0);
	});
