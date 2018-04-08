// angular
// .module('app.base')
// .factory('loaderInterceptor', ['$q', '$injector', 'cfpLoadingBar', function($q, $injector) {
//     var sessionRecoverer = {
//         request: function(request) {
//             console.log('request');
//             cfpLoadingBar.start();
//             return request;
//         },
//         response: function(response) {
//             console.log('response');
//             cfpLoadingBar.complete();
//             return response;
//         },
//         responseError: function(response) {
//             console.log('responseError');
//             cfpLoadingBar.complete();
//             return $q.reject(response);
//         }
//     };
//     return sessionRecoverer;
// }]);
//
// angular
// .module('app.base')
// .config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push('loaderInterceptor');
// }]);
