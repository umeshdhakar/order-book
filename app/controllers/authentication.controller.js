(function () {
    'use strict';
    angular.module('order-book')
        .controller('AuthenticationController', AuthenticationController);
    AuthenticationController.$inject = ['$rootScope', '$location', '$localStorage', '$http', 'AuthenticationService'];

    function AuthenticationController($rootScope, $location, $localStorage, $http, AuthenticationService) {
        var vm = this;

        if ($localStorage.currentUser)
            vm.isAuthenticated = true;
        else
            vm.isAuthenticated = false;

        vm.login = function () {
            var promise = AuthenticationService.login(vm.username, vm.password);
            promise.then(function (response) {
                    if (response.data.token) {
                        $localStorage.currentUser = {
                            user: vm.username,
                            token: response.data.token
                        };
                        $http.defaults.headers.common.Authorization = "JWT " + response.data.token;
                        vm.isAuthenticated = true;
                        vm.user = $localStorage.currentUser.user;
                        $rootScope.$broadcast('refreshDueList');
                        $rootScope.$broadcast('refreshPendingList');
                        $location.path('/');
                    } else {
                        vm.error = "Invalid details.";
                    }
                })
                .catch(function (error) {
                    vm.error = "Oops! Something Wrong!";
                });
        };
        vm.logout = function () {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            if (!$localStorage.currentUser) {
                vm.error = "Log Out Successfully.";
                vm.isAuthenticated = false;
            } else
                vm.error = "Oops!";
        }
    }
})();
