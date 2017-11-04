(function () {
    'use strict';
    var angular = require('angular');
    angular.module('order-book')
        .controller('AuthenticationController', require('./authentication.controller'))
        .controller('CustomerOrderController', require('./customerOrder.controller'))
        .controller('CustomerSectionController', require('./customerSection.controller'))
        .controller('DueOrderController', require('./dueOrder.controller'))
        .controller('PendingOrderController', require('./pendingOrder.controller'))
        .controller('OrderDetailController', require('./orderDetail.controller'));
    
})();