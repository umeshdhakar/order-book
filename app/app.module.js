(function () {
    
    'use strict';
//    angular.module('order-book', ['ngRoute', require('ngStorage')])
    
    angular.module('order-book', ['ngRoute', 'ngStorage', 'ngRoute'])
        .run(run)
        .constant('ApiPath', 'http://127.0.0.1:8000/webapi/')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/order/:param', {
                    templateUrl: '../views/orderDetail.html',
                    controller: 'OrderDetailController',
                    controllerAs: 'orderDetail'
                })
                .when('/', {
                    templateUrl: '../views/customerSection.html',
                    controller: 'CustomerSectionController',
                    controllerAs: 'customers'
                })
                .when('/login', {
                    templateUrl: '../views/login.html',
                    controller: 'AuthenticationController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    template: '<h3>Click on Order to show Details.</h3>'
                });
    }]);
    
    require('./controllers');
    require('./directives');
    require('./services');
    
    
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

