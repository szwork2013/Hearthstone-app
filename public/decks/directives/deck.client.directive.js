'use strict';

angular.module('decks').directive('hsdeck', function() {
        return {
            restrict: 'AEC',
            scope: {
                deck: '='
            },
            replace: true,
            templateUrl: 'decks/views/deck-directive.client.view.html',
            link: function(scope, elem, attrs){

            }
        }
});
