(function () {
    angular.module('app.base').controller('BaseCompanyController', baseCompanyController);

    baseCompanyController.$inject = ['$route', '$routeParams', '$scope', '$location', '$uibModal', 'alertService', 'companyService'];

    function baseCompanyController($route, $routeParams, $scope, $location, $uibModal, alertService, companyService) {
        var vm = this;

        /****** Constructor ******/

        (function () {
            init();
        })();


        /****** Private Functions ******/

        function checkForCookie() {

        }

        function init() {
            checkForCookie();

            alertService.clear();
            if (angular.isDefined($routeParams.companyId) && $routeParams.companyId != 'new') {
                loadCompanyData($routeParams.companyId);
            } else {
                listCompanyData();
            }
        }

        function listCompanyData() {
            companyService.list(null,
                function (data) {
                    $scope.$emit('listCompanyDataSuccess', data);
                },
                function (data) { $scope.$emit('listCompanyDataFailure', data); },
                function (data) { $scope.$emit('listCompanyDataFinally', data); });
        }

        function loadCompanyData(companyId) {
            if (companyId != 'new') {
                companyService.get(companyId, function (data) {
                    $scope.$emit('loadCompanyDataSuccess', data);
                },
                function (data) { $scope.$emit('loadCompanyDataFailure', data); },
                function (data) { $scope.$emit('loadCompanyDataFinally', data); });
            } else {
                $scope.$emit('loadCompanyDataSuccess', {});
            }
        }

        function saveCompanyData(model) {
            alertService.clear();

            companyService.save(model,
                function (data) {
                    $scope.$emit('saveCompanyDataSuccess', data);
                },
                function (data) { $scope.$emit('saveCompanyDataFailure', data); },
                function (data) { $scope.$emit('saveCompanyDataFinally', data); });
        }

        function deleteCompanyData(companyId) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'Templates/_common/confirmationModal.html',
                controller: 'ConfirmModalController as confirmModalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Disable Company',
                            message: 'Are you sure that you want to disable this Company? This means you can still view the Company and all of its child data but will not be able to modify anything..',
                            okText: 'Yes, Disable',
                            cancelText: 'Cancel'
                        }
                    }
                }
            }).result.then(function (confirm) {
                if (!confirm) { return; }
                companyService.remove(companyId,
                        function (data) {
                            $scope.$emit('deleteCompanyDataSuccess', data);
                        },
                        function (data) { $scope.$emit('deleteCompanyDataFailure', data); },
                        function (data) { $scope.$emit('deleteCompanyDataFinally', data); });
                }, function () {
                    // cancel callback
                });
        }



        /****** Exposed Functions ******/

        return {
            listCompanyData: listCompanyData,
            loadCompanyData: loadCompanyData,
            saveCompanyData: saveCompanyData,
            deleteCompanyData: deleteCompanyData
        };
    }

})();
