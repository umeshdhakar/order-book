(function () {
    'use strict';
    angular.module('order-book')
        .controller('CustomerOrderController', CustomerOrderController);

    CustomerOrderController.$inject = ['$rootScope', 'CustomerSectionService'];

    function CustomerOrderController($rootScope, CustomerSectionService) {

        var orders = this;
        var customerID = 0 ;
        orders.newOrder = {};
        $rootScope.$on('showCustomerOrders', function (event, args) {
            var promise = CustomerSectionService.getCustomerOrders(args.id);
            customerID = args.id;
            orders.isCustomerSelected = true ;
            promise.then(function (response) {
                orders.list = response.data;
            }).catch(function (error) {});
            
            promise = CustomerSectionService.getCustomerDetail(args.id);
            promise.then(function (response) {
                orders.customerData = response.data;
            }).catch(function (error) {});
        });
        orders.addNewOrder = function() {
            orders.newOrder.customer = customerID ;
//            var d = new Date();
//                var date = d.getDate();
//                var mon = d.getMonth() + 1;
//                var year = d.getFullYear();
//                date = (date < 10) ? '0' + date : date;
//                mon = (mon < 10) ? '0' + mon : mon;
//                orders.newOrder.order_date = (year + '-' + mon + '-' + date) ;
//                orders.newOrder.due = orders.newOrder.total - orders.newOrder.discount - orders.newOrder.advance;
//                if(orders.newOrder.due > 0 ) orders.newOrder.payment = 'due';
//                else orders.newOrder.payment = 'received';
            var promise = CustomerSectionService.addNewOrder(orders.newOrder);
            promise.then(function(response){
                console.log(response.statusText);
            });
        }
    }
})();