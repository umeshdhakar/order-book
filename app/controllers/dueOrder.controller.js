(function () {
    'use strict';
    angular.module('order-book')
        .controller('DueOrderController', DueOrderController);
    DueOrderController.$inject = ['DueOrderService'];

    function DueOrderController(DueOrderService) {
        var dueOrder = this;
        var promise = DueOrderService.getList();
        promise.then(function (response) {
                dueOrder.list = response.data;
                console.log(dueOrder.list);
            })
            .catch(function (error) {
                console.log('something wrong');
            });
    }

})();