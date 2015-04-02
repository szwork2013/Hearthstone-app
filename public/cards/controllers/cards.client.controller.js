'use strict';

angular.module('cards').controller('CardsController',
    ['$stateParams', '$state', '$location','$q', '$filter', 'Cards',
    function($stateParams, $state,  $location, $q, $filter, Cards) {
        var vmCards = this;
        var cards = Cards.query();
        vmCards.filteredCards = [];
        vmCards.card = null;

        $q.when(
            cards.$promise
        ).then(function() {
            getPage();
        });

        vmCards.findOne = findOne;
        vmCards.pageChanged = pageChanged;
        vmCards.getPage = getPage;

        vmCards.cardsPerPage = 8; // max cards per page
        vmCards.currentPage = 1; // default page to display
        vmCards.maxSize = 5; //
        vmCards.totalCards = 0; //

        vmCards.expansionFilter = ''; // GvG, Naxx, BRM
        vmCards.raceFilter = '';
        vmCards.playerClassFilter = '';
        vmCards.attackFilter = '';
        vmCards.healthFilter = '';
        vmCards.mechanicsFilter = '';
        vmCards.typeFilter = '';
        vmCards.nameFilter = '';
        vmCards.rarityFilter = '';
        vmCards.manacostFilter = '';

        function pageChanged() {
            getPage();
        }

        function getPage() {
            var begin = ((vmCards.currentPage - 1) * vmCards.cardsPerPage);
            var end = begin + vmCards.cardsPerPage;
            vmCards.filteredCards = $filter('filter')(cards, {
                //expansion: vmCards.expansionFilter,
                race: vmCards.raceFilter,
                playerClass: vmCards.playerClassFilter,
                attack: vmCards.attackFilter,
                health: vmCards.healthFilter,
                //mechanics: vmCards.mechanicsFilter,
                type: vmCards.typeFilter,
                name: vmCards.nameFilter,
                rarity: vmCards.rarityFilter,
                cost: vmCards.manacostFilter
            });
            vmCards.totalCards = vmCards.filteredCards.length+140;
            vmCards.filteredCards = vmCards.filteredCards.slice(begin, end);
        }

        // Create a new controller method for retrieving a single card
        function findOne() {
            console.log($stateParams.cardId);
            vmCards.card = Cards.get({
                cardId: $stateParams.cardId
            });
        }
    }
]);