(function () {
    'use strict';
    angular.module('order-book')
        .controller('PendingOrderController', PendingOrderController);
    PendingOrderController.$inject = ['PendingOrderService'];

    function PendingOrderController(PendingOrderService) {
        var pendingOrder = this;
        var promise = PendingOrderService.getList();
        promise.then(function (response) {
                pendingOrder.list = response.data;
                console.log(pendingOrder.list);
            })
            .catch(function (error) {
                console.log('something wrong');
            });
    }

})();