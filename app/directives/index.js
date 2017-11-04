(function () {
    'use strict';
    var angular = require('angular');
    angular.module('order-book')
        .directive('loading', require('./loading.directive'));
})();