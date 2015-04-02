'use strict';

angular.module('users')
    .controller('UsersController', ['$rootScope', '$scope', '$state',  'Users', 'AuthTokenFactory',
        function($rootScope, $scope, $state, Users, AuthTokenFactory) {
            var UsersCtrl = this;

            UsersCtrl.signin = signin;
            UsersCtrl.signup = signup;


            function signin(email, password) {
                var data = {
                    email: email,
                    password: password
                };
                Users.signin(data, function(res) {// success
                    // Errors
                    if (res.type == false) {
                        UsersCtrl.errorMessages = res.message;
                    } else {
                        AuthTokenFactory.setToken(res.data.token);
                        UsersCtrl.user = res.user;
                        $scope.setCurrentUser(res.user);
                        //if($rootScope.previousState){
                        //    $state.go($rootScope.previousState);
                        //}
                        $state.go('home');
                    }
                }, function() {//error
                    UsersCtrl.errorMessages = 'Failed to signin';
                })
            }

            function signup(email, password) {
                var data = {
                    email: email,
                    password: password
                };
                Users.signup(data, function(res) {// success
                    if (res.type == false) {
                        UsersCtrl.errorMessages = res.message;
                    } else {
                        // Save token to local storage
                        AuthTokenFactory.setToken(res.data.token);
                        UsersCtrl.user = res.user;
                        $scope.setCurrentUser(res.user);
                        //if($rootScope.previousState){
                        //    $state.go($rootScope.previousState);
                        //}
                        $state.go('home');
                    }
                }, function() {//error
                    UsersCtrl.errorMessages = 'Failed to signup';
                })
            }
    }]);