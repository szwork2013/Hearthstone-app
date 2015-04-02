'use strict';

angular.module('decks').controller('Deckbuilder.create', ['$stateParams', '$state', 'DeckBuilderService',
    function($stateParams, $state, DeckBuilderService){
        var dbCreate = this;

        dbCreate.deck = DeckBuilderService.getDeck();

        dbCreate.playerClass = $stateParams.playerClass;
        DeckBuilderService.setDeckPlayerClass(dbCreate.playerClass);

        dbCreate.getDeckCardRows = DeckBuilderService.getDeckCardRows;
        dbCreate.removeCard = DeckBuilderService.removeCard;
        dbCreate.resetDeck = DeckBuilderService.resetDeck;
        dbCreate.saveDeck = saveDeck;
        dbCreate.calcManacost = DeckBuilderService.calcManacost;

        dbCreate.closeAlert = closeAlert;
        dbCreate.deckTypes = ['Aggro', 'Combo', 'Control', 'MidRange', 'Tempo', 'Undefined'];

        function saveDeck(){
            DeckBuilderService.save(
                function(res){// success
                    $state.go('deck', {deckId:res._id});
                },
                function(res, err){// error
                    console.log(res.data.message);
                    dbCreate.errorMessage = res.data.message;
                    //$state.go('home');
                }
            );
        }

        function closeAlert() {
            dbCreate.errorMessage = '';
        }
    }
]);