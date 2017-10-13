(function () {
    'use strict';
    angular.module('order-book')
        .service('CustomerSectionService', CustomerSectionService);

    CustomerSectionService.$inject = ['$http', 'ApiPath'];

    function CustomerSectionService($http, ApiPath) {
        var service = this;
        service.getCustomerList = function () {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'customer/list'),
            });
            return response;
        }

        service.addCustomer = function (customer) {
            var response = $http({
                method: 'POST',
                url: (ApiPath + 'customer/new'),
                data: customer,
            });
            return response;
        }
        service.getCustomerDetail = function (customerID) {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'customer/' + customerID),
            });
            return response;
        }

        service.getCustomerOrders = function (customerID) {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'customer/' + customerID + '/orders'),
            });
            return response;
        }
        service.addNewOrder = function(order) {       
                var d = new Date();
                var date = d.getDate();
                var mon = d.getMonth() + 1;
                var year = d.getFullYear();
                date = (date < 10) ? '0' + date : date;
                mon = (mon < 10) ? '0' + mon : mon;
                order.order_date = (year + '-' + mon + '-' + date) ;
                order.due = order.total - order.discount - order.advance;
                if(order.due > 0 ) order.payment = 'due';
                else               order.payment = 'received';
            
            var response = $http({
                method: 'POST',
                url: (ApiPath + 'orders/new'),
                data : order,
            });
            return response;
        }
    }

})();