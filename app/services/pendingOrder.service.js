(function () {
    'use strict';
    angular.module('order-book')
        .service('PendingOrderService', PendingOrderService);

    PendingOrderService.$inject = ['$http', 'ApiPath'];

    function PendingOrderService($http, ApiPath) {
        var service = this;
        service.getList = function () {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'orders/pending'),
            });
            return response;
        }
    }

})();
