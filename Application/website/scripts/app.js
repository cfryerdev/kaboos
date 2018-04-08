'use strict';

var _UI = angular.module('app.ui', ['ui.bootstrap', 'angular-loading-bar']);
var _COMMON = angular.module('app.common', ['ngRoute', 'ngAnimate', 'alerts', 'ngCookies']);
var _FEATURES = angular.module('app.features', ['app.base', 'navigation', 'account', 'favorites', 'company', 'project', 'team', 'release', 'wizard', 'search', 'notifications']);
var _APP = angular.module('KABOOS_APP', ['app.ui', 'app.common', 'app.features']).config(applicationConfig);
