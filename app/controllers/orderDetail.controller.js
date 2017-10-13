(function () {
    'use strict';
    angular.module('order-book')
        .controller('OrderDetailController', OrderDetailController);
    OrderDetailController.$inject = ['$routeParams', 'OrderDetailService'];

    function OrderDetailController($routeParams, OrderDetailService) {
        var orderDetail = this;
        orderDetail.param = $routeParams.param;

        var promise = OrderDetailService.getOrderDetail(orderDetail.param);
        promise.then(function (response) {
                orderDetail.data = response.data;
            })
            .catch(function (error) {
                console.log('something wrong');
            });
        orderDetail.updateOrder = function () {
            var promise = OrderDetailService.updateOrder(orderDetail.data);
            promise.then(function (response) {
                    orderDetail.message = response.statusText;
                })
                .catch(function (error) {
                    orderDetail.message = response.statusText;
                });
        }
    }

})();