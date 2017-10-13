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
            var response = $http({
                method: 'POST',
                url: (ApiPath + 'orders/new'),
                data : order,
            });
            return response;
        }
    }

})();