(function () {
    'use strict';
    angular.module('order-book')
        .controller('CustomerOrderController', CustomerOrderController);

    CustomerOrderController.$inject = ['$rootScope', 'CustomerSectionService'];

    function CustomerOrderController($rootScope, CustomerSectionService) {

        var orders = this;
        var customerID = 0 ;
        orders.newOrder = {};
        orders.orderMessage = '';
        $rootScope.$on('showCustomerOrders', function (event, args) {
            var promise = CustomerSectionService.getCustomerOrders(args.id);
            customerID = args.id;
            orders.isCustomerSelected = true ;
            promise.then(function (response) {
                orders.list = response.data;
            });
            
            promise = CustomerSectionService.getCustomerDetail(args.id);
            promise.then(function (response) {
                orders.customerData = response.data;
            });
        });
        orders.addNewOrder = function() {
            orders.newOrder.customer = customerID ;
            var promise = CustomerSectionService.addNewOrder(orders.newOrder);
            promise.then(function(response){
                orders.orderMessage = response.statusText;
                $rootScope.$broadcast('showCustomerOrders', {id:customerID});
            })
            .catch(function(error){
                orders.orderMessage = error.statusText;
            });
        }
    }
})();