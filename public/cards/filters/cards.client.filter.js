'use strict';

//Create Card Pagination Filter
angular.module('cards').filter('offset', function() {
    return function(input, start) {
        // Parse start index
        start = parseInt(start, 10);
        // Slice Input Array with start index
        return input.slice(start);
    };
});

////Card Manacost Filter
//angular.module('cards').filter('manacostFilter', function() {
//    return function(input, cost) {
//        // Parse manacost
//        var manacost = parseInt(cost, 10) ;
//
//        var output = [];
//        var card;
//        for (card in input){
//            if(card.cost === manacost) {
//                output.add(card);
//            }
//        }
//        return output;
//    };
//});

//expansion: $scope.expansionFilter,
//    attack: $scope.attackFilter,
//    health: $scope.healthFilter,
//    mechanics: $scope.mechanicsFilter,
//    type: $scope.typeFilter,
//    name: $scope.nameFilter,
//    rarity: $scope.rarityFilter,
//    manacost: $scope.manacostFilter