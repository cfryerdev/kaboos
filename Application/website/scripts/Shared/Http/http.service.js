angular.module('app.base')
.factory('baseService',
[
    '$http', '$q', '$location', 'errorService', 'cfpLoadingBar',
    function ($http, $q, $location, errorService, cfpLoadingBar) {
        var vm = this;

        function baseHttpCall(args) {
            if (typeof args === 'undefined' || args === null) {
                alertService.add('danger', 'An error has occurred.');
                console.log('The args parameter in baseService.baseHttpCall is null or undefined');
                return false;
            }

            if (typeof args !== 'object') {
                alertService.add('danger', 'An error has occurred.');
                console.log('The args parameter in baseService.baseHttpCall is of type ' + typeof args + ' instead of type object.');
                return false;
            }

            var req = {
                url: args.path,
                method: args.method,
                headers: args.headers || { 'Content-type': 'application/json' },
                data: args.data,
                withCredentials: true,
                params: typeof args.filters !== 'undefined' ? args.filters : null
            };

            if (typeof args.cacheRequest === "boolean") {
                req.cache = args.cacheRequest;
            }

            cfpLoadingBar.start();

            $http(req)
                .then(function(r) {
                    if (typeof args.successCallback !== 'undefined' && args.successCallback !== null) {
                        args.successCallback(r.data);
                    }
                })
                .catch(function (res) {
                    errorService.safeCheckUnauthorized(res, function () {
                        if (typeof args.errorCallback !== 'undefined' && args.errorCallback !== null) {
                          args.errorCallback(res);
                        }
                        else {
                          errorService.handleError(res);
                        }
                    });
                })
                .finally(function(r) {
                    if (typeof args.finallyCallback !== 'undefined' && args.finallyCallback !== null) {
                        args.finallyCallback(r);
                    }
                    cfpLoadingBar.complete();
                });
        }

        return {
            /**
             * @name get
             *
             *
             * @param {string} path String describing the relative path route to the service endpoint.
             *      The path is appended to the base service URL and version before calling the service endpoint.
             *
             * @param {function} successCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the success promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             * @param {function} errorCallback Optional callback function that is invoked after
             *      the ajax service call returns an error and resolves the error promise. This parameter is checked
             *      for undefined and is replaced with defaultErrorCallback if undefined.
             *
             * @param {function} finallyCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the finally promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             * @param {object} filters Optional filters object that will be built into query string parameters.
             *      If filters is undefined, no query string filters will be appended to the route.
             *
             * @param {boolean} cacheRequest Optional parameter.  If true, the get request will be cached internally in $http.
             *      If false, the get request will be explicitly uncached.   If undefined, null, or a non-bool type,
             *      the request will not be cached.
             *
            **/
            get: function(path, successCallback, errorCallback, finallyCallback, filters, cacheRequest) {
                var args = {
                    method: 'GET',
                    path: path,
                    successCallback: successCallback,
                    errorCallback: errorCallback,
                    finallyCallback: finallyCallback,
                    filters: filters,
                    cacheRequest: cacheRequest
                };

                return baseHttpCall(args);
            },

            /**
             * @name getById
             *
             *
             * @param {string} path String describing the relative path route to the service endpoint.
             *      The path is appended to the base service URL and version before calling the service endpoint.
             *
             * @param {string} id String id that is appended to the path to specify the unique record to retrieve.
             *
             * @param {function} successCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the success promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             * @param {function} errorCallback Optional callback function that is invoked after
             *      the ajax service call returns an error and resolves the error promise. This parameter is checked
             *      for undefined and is replaced with defaultErrorCallback if undefined.
             *
             * @param {function} finallyCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the finally promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
            **/
            getById: function(path, id, successCallback, errorCallback, finallyCallback) {
                return this.get(path + id, successCallback, errorCallback, finallyCallback);
            },

            /**
             * @name update
             *
             *
             * @param {string} path String describing the relative path route to the service endpoint.
             *      The path is appended to the base service URL and version before calling the service endpoint.
             *
             * @param {object} dataToUpdate Object to PUT to the server to create a new record.
             *
             * @param {function} successCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the success promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             * @param {function} errorCallback Optional callback function that is invoked after
             *      the ajax service call returns an error and resolves the error promise. This parameter is checked
             *      for undefined and is replaced with defaultErrorCallback if undefined.
             *
             * @param {function} finallyCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the finally promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
            **/
            update: function(path, dataToUpdate, successCallback, errorCallback, finallyCallback) {
                var args = {
                    method: 'PUT',
                    path: path,
                    data: dataToUpdate,
                    successCallback: successCallback,
                    errorCallback: errorCallback,
                    finallyCallback: finallyCallback
                };

                return baseHttpCall(args);
            },

            /**
             * @name create
             *
             *
             * @param {string} path String describing the relative path route to the service endpoint.
             *      The path is appended to the base service URL and version before calling the service endpoint.
             *
             * @param {object} newDate Object to POST to the server to create a new record.
             *
             * @param {function} successCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the success promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             * @param {function} errorCallback Optional callback function that is invoked after
             *      the ajax service call returns an error and resolves the error promise. This parameter is checked
             *      for undefined and is replaced with defaultErrorCallback if undefined.
             *
             * @param {function} finallyCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the finally promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
            **/
            create: function(path, newData, successCallback, errorCallback, finallyCallback) {
                var args = {
                    method: 'POST',
                    path: path,
                    data: newData,
                    successCallback: successCallback,
                    errorCallback: errorCallback,
                    finallyCallback: finallyCallback
                };

                return baseHttpCall(args);
            },

            /**
             * @name delete
             *
             *
             * @param {string} path String describing the relative path route to the service endpoint.
             *      The path is appended to the base service URL and version before calling the service endpoint.
             *      The path should be appended with /id in order to specify the record to be deleted.
             *
             * @param {function} successCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the success promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             * @param {function} errorCallback Optional callback function that is invoked after
             *      the ajax service call returns an error and resolves the error promise. This parameter is checked
             *      for undefined and is replaced with defaultErrorCallback if undefined.
             *
             * @param {function} finallyCallback Optional callback function that is invoked after
             *      the ajax service call successfully resolves the finally promise. This parameter is checked
             *      for undefined and is not called if undefined.
             *
             *      delete is a protected keyword.  The key can be wrapped as a string instead. E.g. "delete"
            **/
            "delete": function(path, successCallback, errorCallback, finallyCallback) {
                var args = {
                    method: 'DELETE',
                    path: path,
                    successCallback: successCallback,
                    errorCallback: errorCallback,
                    finallyCallback: finallyCallback
                };

                return baseHttpCall(args);
            },

            invokeUri: function (path, request, successCallback) {
                return asyncGetBaseUrl()
                .then(function () {
                    var params = '?';

                    if (typeof request !== 'undefined' && request !== null) {
                        for (var prop in request) {
                            if (request.hasOwnProperty(prop)) {
                                params += prop;
                                params += '=';
                                params += request[prop];
                                params += '&';
                            }
                        }
                    }

                    if (params[params.length - 1] === '&') {
                        params = params.substring(0, params.length - 1);
                    }

                    successCallback(getUrl(path) + params);
                });
            }
        };
    }
]);
