(function () {
    'use strict';
    angular.module('order-book')
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
})();
