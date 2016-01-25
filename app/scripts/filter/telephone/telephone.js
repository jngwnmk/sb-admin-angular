'use strict';

angular.module('sbAdminApp').filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var start, mid, end;
         if(value.length<=3){
            return value;
        } else if(value.length>3 && value.length <=6){
            start = value.slice(0,3);
            mid = value.slice(3);
            return start + '-' + mid;
            
        } else if(value.length>=7){
            switch (value.length) {
                case 12:
                    start = value.slice(0,3);
                    mid = value.slice(3,7);
                    end = value.slice(7,11);
                    break;
                case 11:
                    start = value.slice(0,3);
                    mid = value.slice(3,6);
                    end = value.slice(6,10);
                    break;
                default:
 	    	           start = value.slice(0,3);
  		  	        mid = value.slice(3);
                  return start + '-' + mid;
          				
            }    
            return start + '-' + mid + '-' + end;
        }
        
    };
});

function Ctrl($scope){
    $scope.phoneNumber =  4085265552;

}
