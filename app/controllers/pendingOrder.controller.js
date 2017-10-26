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
                console.log(pendingOrder.list);
            })
            .catch(function (error) {
                console.log('something wrong');
            });
        }
        $rootScope.$on('refreshPendingList', function(){
                getPendingOrders();
        });
    }

})();