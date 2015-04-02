'use strict';

angular.module('main').controller('MainController', ['$scope', 'jwtHelper', 'AuthTokenFactory', '$rootScope',
    function($scope, jwtHelper, AuthTokenFactory, $rootScope) {
        //$rootScope.previousState;
        //$rootScope.currentState;
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            //console.log('Previous state:'+$rootScope.previousState);
            //console.log('Current state:'+$rootScope.currentState)
        });
        $scope.user = null;
        getUser();
        function getUser() {
            var token = AuthTokenFactory.getToken();
            if(token){
                $scope.user = jwtHelper.decodeToken(token);
            }
        }

        $scope.errorMessage = '';

        $scope.setCurrentUser = function (u) {
            $scope.user = u;
        };

        $scope.signout = function(){
            AuthTokenFactory.setToken();
            $scope.setCurrentUser(null);
        }
    }
]);