(function () {
    'use strict';
    angular.module('order-book')
        .controller('PendingOrderController', PendingOrderController);
    PendingOrderController.$inject = ['$rootScope', 'PendingOrderService'];

    function PendingOrderController($rootScope, PendingOrderService) {
        var pendingOrder = this;
        
        function getPendingOrders(){
            
            var promise = PendingOrderService.getList();
        promise.then(function (response) {
                pendingOrder.list = response.data;
            });
        }
        $rootScope.$on('refreshPendingList', function(){
                getPendingOrders();
        });
    }

})();