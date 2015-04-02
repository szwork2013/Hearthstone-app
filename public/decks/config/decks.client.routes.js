'use strict';

// Configure the 'decks' module routes
angular.module('decks')
    //.config(['$routeProvider',
    //    function($routeProvider) {
    //        $routeProvider
    //            .when('/decks', {
    //                templateUrl: 'decks/views/list-decks.client.view.html'
    //            })
    //            .when('/decks/create/:playerClass', {
    //                templateUrl: 'decks/views/deck-builder.client.view.html'
    //            })
    //            .when('/decks/:deckId', {
    //                templateUrl: 'decks/views/view-deck.client.view.html'
    //            })
    //            .when('/decks/:deckId/edit', {
    //                templateUrl: 'decks/views/edit-deck.client.view.html'
    //            });
    //    }
    //]);
    .config(['$stateProvider', '$translateProvider', function($stateProvider, $translateProvider) {
        $stateProvider
            .state('decks', {
                url: '/decks',
                templateUrl: 'decks/views/list-decks.client.view.html',
                controller: 'DecksController as DecksCtrl'
            })
            .state('deck', {
                url: '/deck/:deckId',
                templateUrl: 'decks/views/view-deck.client.view.html',
                controller: 'DecksController as DecksCtrl'
            })
            //.state('deckbuilder', {
            //    url: '/decks/create/:playerClass',
            //    templateUrl: 'decks/views/deck-builder.client.view.html',
            //    controller: 'DecksController'
            //})
            .state('deckbuilder', {
                abstract: true,
                templateUrl: 'decks/views/deck-builder.client.view.html'
            })
            .state('deckbuilder.create', {
                url: '/deckbuilder/create/:playerClass',
                data: {
                    // Inherited Custom Data
                    // https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views#inherited-custom-data
                    // not working without parents 'data'
                    // cards display mode
                    displayMode: 'deckbuilder'//$state.current.data.displayMode
                },
                views: {
                    'builderCards': {
                        templateUrl: 'cards/views/list-builder.client.view.html',
                        controller: 'BuilderCards as builder'
                    },
                    'decklist': {
                        templateUrl: 'decks/views/decklist.client.view.html',
                        controller: 'Deckbuilder.create as dbCreate'
                    },
                    'stats': {
                        templateUrl: 'decks/views/deck-stats.client.view.html',
                        controller: 'Deckbuilder.create as dbCreate'
                    }
                }
            });
            //.state('deckbuilder.edit', {
            //    url: '/:deckId/edit',
            //    templateUrl: 'decks/views/edit-deck.client.view.html',
            //    controller: 'DecksController as DecksCtrl'
            //})

        $translateProvider.translations('en', {
            SAVE: 'Save',
            RESET: 'Reset'

        });
        $translateProvider.translations('ru', {
            SAVE: 'Сохранить',
            RESET: 'Сбросить'
        });
    }]);


    //run(['$rootScope', '$state',
    //    function($rootScope, $state){
    //        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    //        console.log('run : '+error);
    //    });
    //}]);