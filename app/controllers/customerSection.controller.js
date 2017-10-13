(function () {
    'use strict';
    angular.module('order-book')
        .controller('CustomerSectionController', CustomerSectionController);
    CustomerSectionController.$inject = ['$rootScope', 'CustomerSectionService'];

    function CustomerSectionController($rootScope, CustomerSectionService) {
        var customers = this;
        customers.data = {};

        function getCustomerList() {

            var promise = CustomerSectionService.getCustomerList();
            promise.then(function (response) {
                    customers.list = response.data;
                })
                .catch(function (error) {
                    console.log('something wrong');
                });
        }
        getCustomerList();
        
        customers.addCustomer = function () {
            var promise = CustomerSectionService.addCustomer(customers.data);
            promise.then(function (response) {
                customers.message = response.statusText;
                getCustomerList();
            }).catch(function (error) {
                console.log('wrong');
            });
            
        }
        customers.getCustomerOrders = function (customerID) {
                $rootScope.$broadcast('showCustomerOrders', {id: customerID });
        }
    }
})();