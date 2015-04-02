'use strict';

angular.module('cards').factory('CardsStore', ['Cards',
    function(Cards) {
        var cards = Cards.query();
        $q.when(
            cards.$promise
        ).then(function() {

        });

        function find() {
            cards = Cards.query();
        }
        function getNeutralCards(){
            console.log('getNeutralCards');
            console.log(cards.length);
            var neutralCards = [];

            for(var i=0; 0 < cards.length; i++){
                if(cards[i].playerClass == "Druid"){
                    console.log('+');
                    neutralCards.push(cards[i]);
                }
            }
            return neutralCards;

        }
        return {
            getNeutralCards: getNeutralCards
        }
    }
]);