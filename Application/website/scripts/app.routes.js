angular.module('app.common')
.factory('applicationConfig', applicationConfig);

applicationConfig.$inject = ['$routeProvider', '$locationProvider'];

function applicationConfig($routeProvider, $locationProvider) {

    // TODO: Should probably find out why this doesnt work
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: true
    //});

    $routeProvider

        // {home}
        .when('/', {
            controller: 'HomeController',
            controllerAs: 'pageController',
            templateUrl: 'templates/home.html'
        })

        // ===============================================================
        // Start Features
        // ===============================================================

        // Dashboard
        .when('/dashboard', {
            controller: 'DashboardController',
            controllerAs: 'pageController',
            templateUrl: 'templates/dashboard.html'
        })

        // Search
        .when('/searchresults', {
            controller: 'SearchController',
            controllerAs: 'pageController',
            templateUrl: 'templates/search/results.html'
        })


        // Favorites
        .when('/favorites', {
            controller: 'FavoritesController',
            controllerAs: 'pageController',
            templateUrl: 'templates/favorites/list.html'
        })

        // Company
        .when('/companies', {
            controller: 'CompanyListController',
            controllerAs: 'pageController',
            templateUrl: 'templates/companies/list.html'
        })
        .when('/companies/:companyId', {
            controller: 'CompanyEditController',
            controllerAs: 'pageController',
            templateUrl: 'templates/companies/edit.html'
        })

        // Project
        .when('/companies/:companyId/projects', {
            controller: 'ProjectListController',
            controllerAs: 'pageController',
            templateUrl: 'templates/projects/list.html'
        })
        .when('/companies/:companyId/projects/:projectId', {
            controller: 'ProjectEditController',
            controllerAs: 'pageController',
            templateUrl: 'templates/projects/edit.html'
        })

        // Team
        .when('/companies/:companyId/teams', {
            controller: 'TeamListController',
            controllerAs: 'pageController',
            templateUrl: 'templates/teams/list.html'
        })
        .when('/companies/:companyId/teams/:teamId', {
            controller: 'TeamEditController',
            controllerAs: 'pageController',
            templateUrl: 'templates/teams/edit.html'
        })

        // Releases
        .when('/releases', {
            controller: 'ReleaseController',
            controllerAs: 'pageController',
            templateUrl: 'templates/releases/list.html'
        })
        .when('/companies/:companyId/releases/:releaseId', {
            controller: 'ReleaseEditController',
            controllerAs: 'pageController',
            templateUrl: 'templates/releases/edit.html'
        })

        // Releases
        .when('/notifications', {
            controller: 'NotificationController',
            controllerAs: 'pageController',
            templateUrl: 'templates/notifications/list.html'
        })

        // Wizard Team
        .when('/wizard/team', {
            controller: 'WizardTeamController',
            controllerAs: 'pageController',
            templateUrl: 'templates/wizard/team.html'
        })
        // Wizard Team
        .when('/wizard/project', {
            controller: 'WizardProjectController',
            controllerAs: 'pageController',
            templateUrl: 'templates/wizard/project.html'
        })
        // Wizard Team
        .when('/wizard/release', {
            controller: 'WizardReleaseController',
            controllerAs: 'pageController',
            templateUrl: 'templates/wizard/release.html'
        })

        // Account / Authentication
        .when('/accounts/login', {
            templateUrl: 'templates/accounts/login.html'
        })
        .when('/accounts/logoff', {
            templateUrl: 'templates/accounts/logoff.html'
        })
        .when('/accounts/register', {
            templateUrl: 'templates/accounts/register.html'
        })
        .when('/accounts/forgotpassword', {
            templateUrl: 'templates/accounts/forgotpassword.html'
        })
        .when('/accounts/profile', {
            controller: 'AccountProfileController',
            controllerAs: 'pageController',
            templateUrl: 'templates/accounts/profile.html'
        })
        .when('/accounts/invites', {
            controller: 'AccountInviteController',
            controllerAs: 'pageController',
            templateUrl: 'templates/accounts/invites.html'
        })
        .when('/accounts/billing', {
            templateUrl: 'templates/accounts/billing.html'
        })

        // ===============================================================
        // End Features
        // ===============================================================

        // Errors and Access
        .when('/noaccess', {
            controller: 'NoAccessController',
            controllerAs: 'pageController',
            templateUrl: 'templates/_common/noaccess.html'
        })
        .when('/error', {
            templateUrl: 'templates/_common/error.html'
        })
        // {Default}
        .otherwise({
            redirectTo: '/'
        });

}
