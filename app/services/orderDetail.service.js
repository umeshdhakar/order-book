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
                url: (ApiPath + 'order'+orderID+'.json'),
            });
            return response;
        }
    }

})();