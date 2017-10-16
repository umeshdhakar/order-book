(function () {
    'use strict';
    angular.module('order-book')
        .controller('SearchOrderController', SearchOrderController);
    SearchOrderController.$inject = ['PendingOrderService'];

    function SearchOrderController(PendingOrderService) {
        var searchOrder = this;
    
    }

})();