'use strict';

angular.module('decks').factory('Decks', ['$resource', function($resource) {
    return $resource('api/decks/:deckId', {
        deckId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);