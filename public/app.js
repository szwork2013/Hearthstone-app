'use strict';

var mainApplicationModuleName = 'Hearthstone-app';

var mainApplicationModule = angular.module(mainApplicationModuleName,
    ['ngResource', 'ui.router',  'ngRoute', 'ui.select', 'ngSanitize', 'angular-jwt', 'pascalprecht.translate', 'main', 'users', 'cards', 'decks' ]);

// Configure the hashbang URLs using the $locationProvider services
// SEO
mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);


// Manually bootstrap the AngularJS application
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});