(function () {
    'use strict';
    angular.module('order-book')
        .service('OrderDetailService', OrderDetailService);

    OrderDetailService.$inject = ['$http', 'ApiPath'];

    function OrderDetailService($http, ApiPath) {
        var service = this;
        service.getOrderDetail = function (orderID) {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'orders/' + orderID),
            });
            return response;
        };
        service.updateOrder = function(order){
            
            if (order.payment == 'received') {
                order.due = 0;
            }
            if (order.status == 'delivered') {
                var d = new Date();
                var date = d.getDate();
                var mon = d.getMonth() + 1;
                var year = d.getFullYear();
                date = (date < 10) ? '0' + date : date;
                mon = (mon < 10) ? '0' + mon : mon;
                order.delivery_date = (year + '-' + mon + '-' + date) ;
            }
            var id = order.id;
            delete order.id;
            
            var response = $http({
                method: 'PUT',
                url: (ApiPath + 'orders/' + id + '/'),
                data: order,
            });
            order.id = id;
            return response;
        }
    }
})();
