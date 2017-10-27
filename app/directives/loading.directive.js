(function () {
    'use strict';
    angular.module('order-book')
        .directive('loading', LoadingSpinner);
    LoadingSpinner.$inject = ['$http'];

    function LoadingSpinner($http) {
        var ddo = {
            restrict: 'A',
            template: '<img src="../assets/img/spinner.gif">',
            link: function ($scope, elm, attrs) {
                $scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                }
                $scope.$watch($scope.isLoading, function (val) {
                    if (val) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };
        return ddo;
    }
})();