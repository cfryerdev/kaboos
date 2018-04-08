angular.module('alerts')
    .factory('alertService', ['$rootScope', 'toaster', '$sce',
        function ($rootScope, toaster, $sce) {
            var onRouteChangeCallback = null;

            function addAlert(type, msg) {
                if (type == undefined || msg == undefined) {
                  return alerts;
                }
              
                return alerts.push({
                    type: type,
                    msg: $sce.trustAsHtml(msg),
                    close: function () {
                        return closeAlert(this);
                    }
                });
            }

            function addAlertArray(errors) {
                if (errors.length == 1) {
                    // We only have one, so lets just push it.
                    return alerts.push({
                        type: errors[0].type,
                        msg: $sce.trustAsHtml('<span>Error: ' + errors[0].msg + '</span>'),
                        close: function () {
                            return closeAlert(this);
                        }
                    });
                }
                else {
                    // build the html string for multiple instances...
                    var htmlstring = '<b>Errors have occurred.</b><ul>';
                    angular.forEach(errors, function (error) {
                        htmlstring += '<li>' + error.msg + '</li>';
                    });
                    htmlstring += '</ul>';

                    // Push the single alert collection with the type defaulted
                    return alerts.push({
                        type: 'danger',
                        msg: $sce.trustAsHtml('<span>' + htmlstring + '</span>'),
                        close: function () {
                            return closeAlert(this);
                        }
                    });
                }

            }

            function closeAlert(alert) {
                return closeAlertIdx(alerts.indexOf(alert));
            }

            function closeAlertIdx(index) {
                return alerts.splice(index, 1);
            }

            function clear() {
                alerts.length = 0;
            }

            function get() {
                return alerts;
            }

            function popToast(type, title, body) {
                toaster.pop(type, title, body);
            }

            function addToastCallback(callback) {
                onRouteChangeCallback = callback;
            }


            $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
                if (typeof onRouteChangeCallback !== 'undefined' && onRouteChangeCallback !== null) {
                    onRouteChangeCallback();
                }

                onRouteChangeCallback = null;
            });

            var service = {
                add: addAlert,
                addArray: addAlertArray,
                closeAlert: closeAlert,
                closeAlertIdx: closeAlertIdx,
                clear: clear,
                get: get,
                popToast: popToast,
                addToastCallback: addToastCallback
            },
            alerts = [];
            return service;
        }
    ]);
