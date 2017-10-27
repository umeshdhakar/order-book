(function () {
    'use strict';
    angular.module('order-book')
        .controller('OrderDetailController', OrderDetailController);
    OrderDetailController.$inject = ['$routeParams', 'OrderDetailService', '$rootScope'];

    function OrderDetailController($routeParams, OrderDetailService, $rootScope) {
        var orderDetail = this;
        orderDetail.param = $routeParams.param;

        var promise = OrderDetailService.getOrderDetail(orderDetail.param);
        promise.then(function (response) {
                orderDetail.data = response.data;
            });
        orderDetail.updateOrder = function () {
            var promise = OrderDetailService.updateOrder(orderDetail.data);
            promise.then(function (response) {
                    if(response.statusText==='OK')
                    orderDetail.message = 'Order Updated';
                    $rootScope.$broadcast('refreshDueList');
                    $rootScope.$broadcast('refreshPendingList');
                })
                .catch(function (error) {
                    orderDetail.message = response.statusText;
                });
                
        }
    }

})();