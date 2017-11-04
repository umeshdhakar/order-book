(function () {
    'use strict';

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
    module.exports = PendingOrderService;

})();
