(function () {
    'use strict';
    angular.module('order-book')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'ApiPath'];

    function AuthenticationService($http, ApiPath) {
        var service = this;
        service.login = function (user, pass) {
            var response = $http({
                method: 'POST',
                url: (ApiPath + 'jwt-auth/'),
                data: {
                    username: user,
                    password: pass
                }
            });
            return response;
        }
    }
})();