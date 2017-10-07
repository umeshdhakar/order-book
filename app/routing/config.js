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
                .otherwise({
                    template: '<h3>Click on Order to show Details.</h3>'
                });
    }]);
})();
