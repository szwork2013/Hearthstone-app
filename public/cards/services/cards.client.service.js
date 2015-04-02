'use strict';

// Create the 'cards' service
angular.module('cards').factory('Cards', ['$resource', 'API_URL', function($resource, API_URL) {
    return $resource('api/cards/:cardId', {
        cardId: '@_id'
    }
    ,{
        'getNeutral':
        {
            method : 'GET',
            url: API_URL+'/api/cards/neutral',
            isArray: true
        }
    }

    );
}]);