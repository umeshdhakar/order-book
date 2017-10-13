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
                .otherwise({
                    template: '<h3>Click on Order to show Details.</h3>'
                });
    }]);
})();
