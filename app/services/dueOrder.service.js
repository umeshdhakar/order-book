(function () {
    'use strict';
    angular.module('order-book')
        .service('DueOrderService', DueOrderService);

    DueOrderService.$inject = ['$http', 'ApiPath'];

    function DueOrderService($http, ApiPath) {
        var service = this;
        service.getList = function () {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'orders/due'),
            });
            return response;
        }
    }

})();
