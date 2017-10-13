(function () {
    'use strict';
    angular.module('order-book')
        .controller('DueOrderController', DueOrderController);
    DueOrderController.$inject = ['$rootScope','DueOrderService'];

    function DueOrderController($rootScope, DueOrderService) {
        var dueOrder = this;
        function getDueOrders(){
            var promise = DueOrderService.getList();    
            promise.then(function (response) {
                dueOrder.list = response.data;
            })
            .catch(function (error) {
                console.log('something wrong');
            });
        }
        getDueOrders();
        $rootScope.$on('refreshDueList', function(event){
                getDueOrders();
        });
    }

})();