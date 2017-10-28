(function () {
    'use strict';
    angular.module('order-book')
        .controller('CustomerSectionController', CustomerSectionController);
    CustomerSectionController.$inject = ['$rootScope', '$localStorage', 'CustomerSectionService'];

    function CustomerSectionController($rootScope, $localStorage, CustomerSectionService) {
        var customers = this;
        customers.data = {};

        function getCustomerList() {

            var promise = CustomerSectionService.getCustomerList();
            promise.then(function (response) {
                    customers.list = response.data;
                });
        }
        
        if($localStorage.currentUser){
            getCustomerList();
        }
        
        customers.addCustomer = function () {
            var promise = CustomerSectionService.addCustomer(customers.data);
            promise.then(function (response) {
                if(response.statusText==='Created')
                customers.message = 'User Added Successfully';
                getCustomerList();
            }).catch(function (error) {
                customers.message = 'Unable to add.';
            });
            
        }
        customers.getCustomerOrders = function (customerID) {
                $rootScope.$broadcast('showCustomerOrders', {id: customerID });
        }
    }
})();