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
//            if (orderDetail.data.payment = 'received') {
//                orderDetail.data.due = 0;
//            }
//            if (orderDetail.data.status = 'delievered') {
//                var d = new Date();
//                var date = d.getDate();
//                var mon = d.getMonth();
//                var year = d.getFullYear();
//                date = (date < 10) ? '0' + date : date;
//                mon = (mon < 10) ? '0' + mon : mon;
//                orderDetail.data.delievery_date = (year + '-' + mon + '-' + date) ;
//            }
            var promise = OrderDetailService.updateOrder(orderDetail.data);
            promise.then(function (response) {
                    console.log(response.statusText);
                })
                .catch(function (error) {
                    console.log('something wrong');
                });
        }
    }

})();