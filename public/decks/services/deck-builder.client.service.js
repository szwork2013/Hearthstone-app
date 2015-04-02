'use strict';

angular.module('decks').factory('DeckBuilderService', ['Decks',
    function(Decks) {
        var deck;
        initDeck();

        return {
            getDeck: getDeck,
            getDeckCardRows: getDeckCardRows,
            setDeckPlayerClass: setDeckPlayerClass,
            addCard: addCard,
            removeCard: removeCard,
            save: save,
            resetDeck: resetDeck,
            calcManacost : calcManacost
        };

        function getDeck() {
            return deck;
        }

        function getDeckCardRows() {
            return deck.cards;
        }

        function initDeck() {
            deck = {
                title : '',
                playerClass : '',
                decktype: '',
                cards : [],
                max : 30,
                min :  0,
                currCardCount : 0,

                typeCardStats :  {
                    minions : 0,
                    spells : 0,
                    weapons : 0
                }
            };
        }

        function setDeckPlayerClass(playerClass){
            deck.playerClass = playerClass;
        }

        function addCard(card){
            if(deck.currCardCount >= 30){
                console.log("30");
                return;
            }
            if(card){
                var cardIndex = deck.cards.indexOf(card);
                if (cardIndex !== -1) {
                    if(deck.cards[cardIndex].rarity === "Legendary"){
                        //console.log("Legendary");
                        return;
                    }
                    if(deck.cards[cardIndex].quan == 2){
                        //console.log(">2");
                    }
                    else{
                        deck.cards[cardIndex].quan = ++deck.cards[cardIndex].quan;
                        addMSWStats(card);
                        ++deck.currCardCount;
                    }
                }
                else{
                    card.quan = 1;
                    deck.cards.push(card);
                    addMSWStats(card);
                    ++deck.currCardCount;
                }

            }
        }

        function removeCard(card){
            if(deck.currCardCount == 0){
                return;
            }
            if(card){
                var cardIndex = deck.cards.indexOf(card);
                if (cardIndex !== -1) {// quan >=1
                    if(deck.cards[cardIndex].quan == 1){
                        deck.cards.splice(cardIndex, 1); // remove card
                        removeMSWStats(card);
                        --deck.currCardCount;
                    }
                    else{
                        deck.cards[cardIndex].quan = --deck.cards[cardIndex].quan;
                        removeMSWStats(card);
                        --deck.currCardCount;
                    }
                } else{
                  console.log("cards is out of range");
                }

            }
        }

        function save(successCallback, errorCallback){
            var prepDeck = {
                playerClass: deck.playerClass,
                title: deck.title,
                decktype: deck.decktype,
                cards : []
            };
            if(deck.cards.length > 0){
                for(var i = 0; i < deck.cards.length; i++){// TODO .forEach
                    prepDeck.cards.push({
                        quan: deck.cards[i].quan,
                        cardId: deck.cards[i]._id
                    });
                }
                //for(var card in deck.cards){
                //
                //}
            }
            Decks.save(prepDeck, successCallback, errorCallback);
        }

        function resetDeck(){
            deck.cards = [];
            deck.currCardCount = 0;
            deck.typeCardStats.minions = 0;
            deck.typeCardStats.spells = 0;
            deck.typeCardStats.weapons = 0;
        }

        function addMSWStats(card){
            if(card.type){
                if(card.type === 'Minion'){
                    deck.typeCardStats.minions++;
                }
                if(card.type === 'Spell'){
                    deck.typeCardStats.spells++;
                }
                if(card.type === 'Weapon'){
                    deck.typeCardStats.weapons++;
                }
            }
        }
        function removeMSWStats(card){
            if(card.type){
                if(card.type === 'Minion'){
                    deck.typeCardStats.minions--;
                }
                if(card.type === 'Spell'){
                    deck.typeCardStats.spells--;
                }
                if(card.type === 'Weapon'){
                    deck.typeCardStats.weapons--;
                }
            }
        }

        function calcManacost(input){
            var count = 0;
            for(var i = 0; i < deck.cards.length; i++){
                if(deck.cards[i].cost && deck.cards[i].cost == input){
                    count += 1*deck.cards[i].quan;
                }
            }
            return count;
        }

}]);