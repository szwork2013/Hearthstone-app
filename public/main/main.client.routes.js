'use strict';

angular.module('main').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '',
                abstract: true
            })
            .state('home', {
                url: '/',
                templateUrl: 'main/views/main.html',
                controller: 'MainController'
            })
            ;
        $urlRouterProvider.otherwise('/');
    }
]);