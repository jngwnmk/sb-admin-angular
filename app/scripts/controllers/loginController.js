'use strict';

angular.module('sbAdminApp')
  .controller('LoginCtrl',
     function($window, $scope, $http, AuthService, Config) {
     
     $scope.login = function () {
            var pwd = $scope.password;
            $http({
                method: 'POST',
                url: Config.getURL()+'api/v1/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {cellphone: $scope.cellphone, password: $scope.password}
            }).success(function (data,status) {
                        console.log(data);
                        console.log(data.user.usertype);
                        if(data.user.usertype=='ADMIN'){
                            console.log("password:"+pwd);
                            $window.location.href = '/#/dashboard/table2';
                              AuthService.setCurrentUser(data.user);
                              AuthService.login(pwd);
                        } else if(data.user.usertype=='USER'){
                            $window.location.href = '/#/dashboard/home';
                            AuthService.setCurrentUser(data.user);
                            AuthService.login(pwd);
                        } else {
                            $window.location.href = '/#/login';
                            AuthService.logout();
                        }
            });
     };
     
     setTimeout(function() {
             $scope.$emit('LoginCtrl');
     }, 0);
  });
     
     
  