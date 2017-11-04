(function () {
    'use strict';
    var angular = require('angular');
    angular.module('order-book')
        .service('AuthenticationService', require('./authentication.service'))
        .service('CustomerSectionService', require('./customerSection.service'))
        .service('DueOrderService', require('./dueOrder.service'))
        .service('PendingOrderService', require('./pendingOrder.service'))
        .service('OrderDetailService', require('./orderDetail.service'));
})();