(function () {
    angular.module('app.base').factory('errorService', errorService);

    errorService.$inject = ['alertService', '$location'];

    function errorService(alertService, $location) {

        /****** Public Functions ******/
        return {
            handleError: handleError,
            parseResponseData: parseResponseData,
            safeCheckUnauthorized: safeCheckUnauthorized
        };

        function safeCheckUnauthorized(response, callback) {
            if (response.status == 403) {
                $location.path('/noaccess');
            }
            else if (response.status == 401) {
                alertService.add('danger', 'Sorry, We were unable to authenticate your request. Please log in.');
                $location.path('/accounts/login');
            }
            else {
                callback(response);
            }
        }

        function handleError(response) {
            switch (response.status) {

                // Not Found
                case 404:
                    $location.path('/accounts/login');
                    break;

                // Not Allowed
                case 401:
                      $location.path('/accounts/login');
                      break;

                // No Access
                case 403:
                      $location.path('/noaccess');
                      break;

                // Validation / Model State
                case 400:
                    alertService.add('danger', parseResponseData(response));
                    break;

                // Server Errors
                case 500:
                case 503:
                default:
                    console.log('Error (' + response.path + '): ' + response);
                    alertService.add('danger', 'Server Error: ' + angular.toJson(response.data));
                    break;
            }
        }

        function parseResponseData(e) {
            if (e.data.messages != undefined) {
                var errors = [];
                angular.forEach(e.data.messages, function (item) {
                    switch (item.Type) {
                        case "service":
                        case "validation":
                            errors.push({ type: 'danger', msg: item.message });
                            break;
                        case "warning":
                            errors.push({ type: 'warning', msg: item.message });
                            break;
                        default:
                            errors.push({ type: 'danger', msg: item.message });
                            break;
                    }
                });
                alertService.addArray(errors);
            }
            else {
                // Handle non handled exception types...
                alertService.add('danger', "Unhandled Error!", e.data.toJson());
            }
        }

    }

})();
