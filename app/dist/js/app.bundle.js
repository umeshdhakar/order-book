webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    
    'use strict';
//    angular.module('order-book', ['ngRoute', require('ngStorage')])
    
    angular.module('order-book', ['ngRoute', 'ngStorage', 'ngRoute'])
        .run(run)
        .constant('ApiPath', 'http://127.0.0.1:8000/webapi/')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/order/:param', {
                    templateUrl: '../views/orderDetail.html',
                    controller: 'OrderDetailController',
                    controllerAs: 'orderDetail'
                })
                .when('/', {
                    templateUrl: '../views/customerSection.html',
                    controller: 'CustomerSectionController',
                    controllerAs: 'customers'
                })
                .when('/login', {
                    templateUrl: '../views/login.html',
                    controller: 'AuthenticationController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    template: '<h3>Click on Order to show Details.</h3>'
                });
    }]);
    
    __webpack_require__(2);
    __webpack_require__(10);
    __webpack_require__(12);
    
    
    run.$inject = ['$http', '$localStorage', '$location', '$rootScope'];
    function run($http, $localStorage, $location, $rootScope){
        if($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = "JWT " + $localStorage.currentUser.token;
        }
        else {
            $location.path('/login');
        }
        
    }
})();



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    'use strict';
    var angular = __webpack_require__(0);
    angular.module('order-book')
        .controller('AuthenticationController', __webpack_require__(4))
        .controller('CustomerOrderController', __webpack_require__(5))
        .controller('CustomerSectionController', __webpack_require__(6))
        .controller('DueOrderController', __webpack_require__(7))
        .controller('PendingOrderController', __webpack_require__(8))
        .controller('OrderDetailController', __webpack_require__(9));
    
})();

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

(function () {
    'use strict';
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
    module.exports = AuthenticationController;
})();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function () {
    'use strict';
    
    CustomerOrderController.$inject = ['$rootScope', 'CustomerSectionService'];

    function CustomerOrderController($rootScope, CustomerSectionService) {

        var orders = this;
        var customerID = 0 ;
        orders.newOrder = {};
        orders.isCustomerSelected = false ;
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
                if(response.statusText==='Created')
                    orders.orderMessage = 'Order Added Successfully' ;
                $rootScope.$broadcast('showCustomerOrders', {id:customerID});
                $rootScope.$broadcast('refreshDueList');
                $rootScope.$broadcast('refreshPendingList');
            })
            .catch(function(error){
                orders.orderMessage = error.statusText;
            });
        }
    }
    module.exports = CustomerOrderController;
})();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

(function () {
    'use strict';
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
    
    module.exports = CustomerSectionController;
})();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function () {
    'use strict';
    
    DueOrderController.$inject = ['$rootScope','$localStorage','DueOrderService'];

    function DueOrderController($rootScope, $localStorage, DueOrderService) {
        var dueOrder = this;
        function getDueOrders(){
            var promise = DueOrderService.getList();    
            promise.then(function (response) {
                dueOrder.list = response.data;
            });
        }
        
        if($localStorage.currentUser){
            getDueOrders();
        }
        $rootScope.$on('refreshDueList', function(event){
                getDueOrders();
        });
    }
    module.exports = DueOrderController;
})();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function () {
    'use strict';
    
    PendingOrderController.$inject = ['$rootScope', '$localStorage', 'PendingOrderService'];

    function PendingOrderController($rootScope, $localStorage, PendingOrderService) {
        var pendingOrder = this;
        
        function getPendingOrders(){
            
            var promise = PendingOrderService.getList();
        promise.then(function (response) {
                pendingOrder.list = response.data;
            });
        }
        if($localStorage.currentUser){
            getPendingOrders();
        }
        $rootScope.$on('refreshPendingList', function(){
                getPendingOrders();
        });
    }
    module.exports = PendingOrderController;

})();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

(function () {
    'use strict';
    
    OrderDetailController.$inject = ['$routeParams', 'OrderDetailService', '$rootScope'];

    function OrderDetailController($routeParams, OrderDetailService, $rootScope) {
        var orderDetail = this;
        orderDetail.param = $routeParams.param;

        var promise = OrderDetailService.getOrderDetail(orderDetail.param);
        promise.then(function (response) {
                orderDetail.data = response.data;
            });
        orderDetail.updateOrder = function () {
            var promise = OrderDetailService.updateOrder(orderDetail.data);
            promise.then(function (response) {
                    if(response.statusText==='OK')
                    orderDetail.message = 'Order Updated';
                    $rootScope.$broadcast('refreshDueList');
                    $rootScope.$broadcast('refreshPendingList');
                })
                .catch(function (error) {
                    orderDetail.message = response.statusText;
                });
                
        }
    }
    module.exports = OrderDetailController;

})();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    'use strict';
    var angular = __webpack_require__(0);
    angular.module('order-book')
        .directive('loading', __webpack_require__(11));
})();

/***/ }),
/* 11 */
/***/ (function(module, exports) {

(function () {
    'use strict';
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
    module.exports = LoadingSpinner;
})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    'use strict';
    var angular = __webpack_require__(0);
    angular.module('order-book')
        .service('AuthenticationService', __webpack_require__(13))
        .service('CustomerSectionService', __webpack_require__(14))
        .service('DueOrderService', __webpack_require__(15))
        .service('PendingOrderService', __webpack_require__(16))
        .service('OrderDetailService', __webpack_require__(17));
})();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

(function () {
    'use strict';

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
    module.exports = AuthenticationService;
})();

/***/ }),
/* 14 */
/***/ (function(module, exports) {

(function () {
    'use strict';

    CustomerSectionService.$inject = ['$http', 'ApiPath'];

    function CustomerSectionService($http, ApiPath) {
        var service = this;
        service.getCustomerList = function () {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'customer/list'),
            });
            return response;
        }

        service.addCustomer = function (customer) {
            var response = $http({
                method: 'POST',
                url: (ApiPath + 'customer/new'),
                data: customer,
            });
            return response;
        }
        service.getCustomerDetail = function (customerID) {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'customer/' + customerID),
            });
            return response;
        }

        service.getCustomerOrders = function (customerID) {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'customer/' + customerID + '/orders'),
            });
            return response;
        }
        service.addNewOrder = function(order) {       
                var d = new Date();
                var date = d.getDate();
                var mon = d.getMonth() + 1;
                var year = d.getFullYear();
                date = (date < 10) ? '0' + date : date;
                mon = (mon < 10) ? '0' + mon : mon;
                order.order_date = (year + '-' + mon + '-' + date) ;
                order.due = order.total - order.discount - order.advance;
                if(order.due > 0 ) order.payment = 'due';
                else               order.payment = 'received';
            
            var response = $http({
                method: 'POST',
                url: (ApiPath + 'orders/new'),
                data : order,
            });
            return response;
        }
    }
    module.exports = CustomerSectionService;

})();

/***/ }),
/* 15 */
/***/ (function(module, exports) {

(function () {
    'use strict';

    DueOrderService.$inject = ['$http', 'ApiPath'];

    function DueOrderService($http, ApiPath) {
        var service = this;
        service.getList = function () {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'orders/due'),
            });
            return response;
        }
    }
    
    module.exports = DueOrderService;

})();


/***/ }),
/* 16 */
/***/ (function(module, exports) {

(function () {
    'use strict';

    PendingOrderService.$inject = ['$http', 'ApiPath'];

    function PendingOrderService($http, ApiPath) {
        var service = this;
        service.getList = function () {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'orders/pending'),
            });
            return response;
        }
    }
    module.exports = PendingOrderService;

})();


/***/ }),
/* 17 */
/***/ (function(module, exports) {

(function () {
    'use strict';

    OrderDetailService.$inject = ['$http', 'ApiPath'];

    function OrderDetailService($http, ApiPath) {
        var service = this;
        service.getOrderDetail = function (orderID) {
            var response = $http({
                method: 'GET',
                url: (ApiPath + 'orders/' + orderID),
            });
            return response;
        };
        service.updateOrder = function(order){
            
            if (order.payment == 'received') {
                order.due = 0;
            }
            if (order.status == 'delivered') {
                var d = new Date();
                var date = d.getDate();
                var mon = d.getMonth() + 1;
                var year = d.getFullYear();
                date = (date < 10) ? '0' + date : date;
                mon = (mon < 10) ? '0' + mon : mon;
                order.delivery_date = (year + '-' + mon + '-' + date) ;
            }
            var id = order.id;
            delete order.id;
            
            var response = $http({
                method: 'PUT',
                url: (ApiPath + 'orders/' + id + '/'),
                data: order,
            });
            order.id = id;
            return response;
        }
    }
    module.exports = OrderDetailService;
})();


/***/ })
],[1]);