// module.factory('sessionInterceptor', ['$q', '$injector', function($q, $injector) {
//     var sessionRecoverer = {
//         responseError: function(response) {
//             // Session has expired
//             if (response.status == 419){
//
//             }
//             return $q.reject(response);
//         }
//     };
//     return sessionRecoverer;
// }]);
//
// module.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push('sessionInterceptor');
// }]);
