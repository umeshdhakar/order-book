(function () {
    'use strict';
    
    DueOrderController.$inject = ['$rootScope','$localStorage','DueOrderService'];

    function DueOrderController($rootScope, $localStorage, DueOrderService) {
        var dueOrder = this;
        function getDueOrders(){
            var promise = DueOrderService.getList();    
            promise.then(function (response) {
                dueOrder.list = response.data;
            });
        }
        
        if($localStorage.currentUser){
            getDueOrders();
        }
        $rootScope.$on('refreshDueList', function(event){
                getDueOrders();
        });
    }
    module.exports = DueOrderController;
})();