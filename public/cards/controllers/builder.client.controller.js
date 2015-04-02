'use strict';

angular.module('cards').controller('BuilderCards', ['$stateParams', '$q', '$filter', 'Cards', 'DeckBuilderService',
    function($stateParams, $q, $filter, Cards, DeckBuilderService) {
        var builder = this;
        var classCards = Cards.query({playerClass: $stateParams.playerClass});
        var neutralCards = Cards.getNeutral();

        builder.rarity = ['All', 'Free', 'Common'];

        builder.filteredNeutralCards = [];
        builder.filteredClassCards = [];
        builder.addCard = addCard;
        builder.getAvailableCards = getAvailableCards;

        $q.when(
            neutralCards.$promise
        ).then(function() {
             neutralPageChanged();
        });

        $q.when(
            classCards.$promise
        ).then(function() {
             classPageChanged();
        });


        builder.neutralPageChanged = neutralPageChanged;
        builder.classPageChanged = classPageChanged;
        builder.pageChanged = pageChanged;
        builder.cardsPerPage = 8;// max cards per page
        builder.maxSize = 6;// page numbers

        builder.totalNeutralCards = 0;//
        builder.currentNeutralPage = 1;// default page to display

        builder.totalClassCards = 0;//
        builder.currentClassPage = 1;// default page to display

        //builder.expansionFilter = '';// GvG, Naxx, BRM
        builder.raceFilter = '';
        builder.playerClassFilter = '';
        builder.attackFilter = '';
        builder.healthFilter = '';
        builder.mechanicsFilter = '';
        builder.typeFilter = '';

        builder.nameFilter = '';
        builder.rarityFilter = '';
        builder.manacostFilter = '';

        function neutralPageChanged() {
            getNeutralPage();
        }
        function classPageChanged() {
            getClassPage();
        }

        function pageChanged(){
            getNeutralPage();
            getClassPage();
        }

        function getNeutralPage() {
            var begin = ((builder.currentNeutralPage - 1) * builder.cardsPerPage);
            var end = begin + builder.cardsPerPage;
            builder.filteredNeutralCards = $filter('filter')(neutralCards, {
                race: builder.raceFilter,
                attack: builder.attackFilter,
                health: builder.healthFilter,
                //mechanics: builder.mechanicsFilter,
                type: builder.typeFilter,
                name: builder.nameFilter,
                rarity: builder.rarityFilter,
                cost: builder.manacostFilter
            });
            builder.totalNeutralCards = builder.filteredNeutralCards.length;//TODO
            builder.filteredNeutralCards = builder.filteredNeutralCards.slice(begin, end);
        }

        function getClassPage() {
            var begin = ((builder.currentClassPage - 1) * builder.cardsPerPage);
            var end = begin + builder.cardsPerPage;
            //builder.filteredClassCards = classCards;
            builder.filteredClassCards = $filter('filter')(classCards, {
                race: builder.raceFilter,
                attack: builder.attackFilter,
                health: builder.healthFilter,
                //mechanics: builder.mechanicsFilter,
                type: builder.typeFilter,
                name: builder.nameFilter,
                rarity: builder.rarityFilter,
                cost: builder.manacostFilter
            });
            builder.totalClassCards = builder.filteredClassCards.length;//TODO
            builder.filteredClassCards = builder.filteredClassCards.slice(begin, end);
        }


        function addCard(card) {
            DeckBuilderService.addCard(card);
        }

        function getAvailableCards() {// TODO
            return '0/2';
        }
    }
]);