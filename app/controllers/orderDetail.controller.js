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
                orderDetail.status = {
                    name: orderDetail.data.status
                };
            })
            .catch(function (error) {
                console.log('something wrong');
            });
    }

})();
