(function () {
    'use strict';
    angular.module('order-book', ['ngRoute', 'ngStorage'])
        .run(run)
        .constant('ApiPath', 'http://127.0.0.1:8000/webapi/');
    
    run.$inject = ['$http', '$localStorage', '$location', '$rootScope'];
    function run($http, $localStorage, $location, $rootScope){
        if($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = "JWT " + $localStorage.currentUser.token;
        }
        else {
            $location.path('/login');
        }
        
    }
})();

