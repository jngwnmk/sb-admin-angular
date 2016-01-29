'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
 
 

angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngSanitize',
    'ngS3upload',
    'ngCookies',
    'ngclipboard',
    'ng'
    
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$httpProvider','ngS3Config',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider, ngS3Config) {
    
    //ngS3Config.theme = 'bootstrap3';
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
        controller :'LoginCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/loginController.js',
                'scripts/filter/telephone/telephone.js']
            })
          }
        }
      })
      .state('/logout',{
          url:'/logout',
          controller : 'LogoutCtrl',
          resolve : {
            loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/logoutController.js',
                ]
            })
          } 
          }
      })
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        controller : 'SidebarCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'HomeCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/homeController.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        },
        usertype : 'USER'
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form',
        controller:'UserAddCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/useraddController.js',
                'scripts/filter/telephone/telephone.js']
            })
          }
        },
        usertype : 'ADMIN'
    })
      .state('dashboard.sample',{
        templateUrl:'views/sample.html',
        url:'/sample',
        controller:'SurveyTmpCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/surveytemplateController.js']
            })
          }
        },
        usertype : 'ADMIN'
    })
      .state('dashboard.blank',{
        templateUrl:'views/template.html',
        url:'/blank/:type',
        controller:'SurveyTmpDetailCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/surveytemplateDetailController.js']
            })
          }
        },
        usertype : 'ADMIN'
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        },
        usertype : 'USER'
    })
      .state('dashboard.excel',{
        templateUrl:'views/excel.html',
        url:'/excel',
        controller:'ExcelCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/excelController.js',
                      ]
            })
          }
        },
        usertype : 'ADMIN'
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table',
        controller:'UserEditCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/usereditController.js',
                      'scripts/filter/telephone/telephone.js']
            })
          }
        },
        usertype : 'USER'
    })
      .state('dashboard.table2',{
        templateUrl:'views/table2.html',
        url:'/table2',
        controller:'UserListCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/userlistController.js']
            })
          }
        },
        usertype : 'ADMIN'
    }).state('dashboard.search',{
        templateUrl:'views/search.html',
        url:'/search/:keyword',
        controller:'UserSearchCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/usersearchController.js']
            })
          }
        },
        usertype : 'ADMIN'
      })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('answer',{
        templateUrl:'views/pages/answer.html',
        url:'/answer/:requestUserId/:surveyUserId/:surveyUserName',
        controller : 'SurveyResultCtrl',
        resolve : {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                 'scripts/controllers/surveyresultController.js'
              ]
            })
          }
        }
      })
      .state('blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank/survey/:userid',
        controller: 'SurveyCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                 'scripts/controllers/surveyController.js'
              ]
            })
          }
        }
      })
      .state('uploadtest',{
        templateUrl : 'views/pages/uploadtest.html',
        url : '/uploadtest',
        controller: 'UploadCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                 'scripts/controllers/uploadController.js'
              ]
            })
          }
        }
      });
   
  }]).
  factory('Config', function(){
      var url = "https://followus-jngwnmk.c9users.io/";
      //var url = "http://default-environment-2idebhmppn.elasticbeanstalk.com/";
      return {
        getURL : function(){
          return url;
        }
      };
  }).
  factory( 'AuthService', function($cookieStore) {
      //var currentUser;
      //var loggedin = false;
      //var password = "";
      return {
        login : function(pwd) { 
          $cookieStore.put('loggedin', 'true');
          $cookieStore.put('password',pwd);
        },
        logout: function() { 
          $cookieStore.put('loggedin','');
          $cookieStore.put('password','');
          $cookieStore.put('currentuser','');
        },
        isLoggedIn: function() {
          return $cookieStore.get('loggedin');
        },
        getPwd : function(){
          return $cookieStore.get('password');;
        },
        setCurrentUser : function(user) { 
          //currentUser = user; 
          $cookieStore.put('currentuser',user);
        }, 
        currentUser : function() { 
          return $cookieStore.get('currentuser');
        },
        currentUserType: function() {
          return $cookieStore.get('currentuser').usertype; 
        }
      };
  }).
  factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
}).run(function ($rootScope, $state,AuthService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      // User 서비스를 추가해서 현재 사용자가 인증된 사용자임을 확인한다.
      if((AuthService.currentUserType() == 'ADMIN' && toState.usertype=='USER')||
         (AuthService.currentUserType() == 'USER' && toState.usertype=='ADMIN')){
          //$state.transitionTo('signin');
          event.preventDefault();
      }

    });

});
  
  
    
