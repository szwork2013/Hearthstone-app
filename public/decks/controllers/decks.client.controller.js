'use strict';

angular.module('decks').controller('DecksController',
    ['$stateParams', 'Decks',
    function($stateParams, Decks) {
        var DecksCtrl = this;
        DecksCtrl.decks = Decks.query();
        DecksCtrl.findOne = findOne;

        function findOne() {
            DecksCtrl.deck = Decks.get({
                deckId: $stateParams.deckId
            });
        }

    }
]);

////Listen route changes
//angular.module('decks').run(['$rootScope', 'AUTH_EVENTS', 'AuthService',
//    function ($rootScope, AUTH_EVENTS, AuthService) {
//        $rootScope.$on('$routeChangeStart', function (event, next) {
//            var authorizedRoles = next.data.authorizedRoles;
//            if (!AuthService.isAuthorized(authorizedRoles)) {
//                event.preventDefault();
//                if (AuthService.isAuthenticated()) {
//                    // user is not allowed
//                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//                } else {
//                    // user is not logged in
//                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
//                }
//            }
//        })
//}]);