'use strict';
angular.module('cards')
    //.config(['$routeProvider',
    //function($routeProvider) {
    //    $routeProvider
    //        .when('/cards', {
    //            templateUrl: 'cards/views/list-cards.client.view.html'
    //        })
    //        .when('/cards/:cardId', {
    //            templateUrl: 'cards/views/view-card.client.view.html'
    //        });
    //}
    //]);
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('cards', {
                url: '/cards',
                templateUrl: 'cards/views/list-cards.client.view.html',
                controller: 'CardsController as vmCards',
                data: {
                    displayMode: 'simple' //$state.current.data.displayMode
                }
            })
            .state('card', {
                url: '/card/{cardId}',
                templateUrl: 'cards/views/view-card.client.view.html',
                controller: 'CardsController as vmCards',
                data: {
                    displayMode: 'simple' //$state.current.data.displayMode
                }
            })
    }]);