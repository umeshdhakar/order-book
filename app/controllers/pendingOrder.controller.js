(function () {
    'use strict';
    
    PendingOrderController.$inject = ['$rootScope', '$localStorage', 'PendingOrderService'];

    function PendingOrderController($rootScope, $localStorage, PendingOrderService) {
        var pendingOrder = this;
        
        function getPendingOrders(){
            
            var promise = PendingOrderService.getList();
        promise.then(function (response) {
                pendingOrder.list = response.data;
            });
        }
        if($localStorage.currentUser){
            getPendingOrders();
        }
        $rootScope.$on('refreshPendingList', function(){
                getPendingOrders();
        });
    }
    module.exports = PendingOrderController;

})();