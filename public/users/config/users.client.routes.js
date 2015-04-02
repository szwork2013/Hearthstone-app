'use strict';

// Configure the 'users' module config
angular.module('users')
    //.config(['$routeProvider',
    //function($routeProvider) {
    //    $routeProvider
    //        .when('/signin', {
    //            templateUrl: 'users/views/signin.html'
    //        })
    //        .when('/signup', {
    //            templateUrl: 'users/views/signup.html'
    //        });
    //}
    //]);
    .config(['$stateProvider', '$translateProvider', function($stateProvider, $translateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'users/views/signin.html',
                controller: 'UsersController as UsersCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'users/views/signup.html',
                controller: 'UsersController as UsersCtrl'
            })
            ;
        $translateProvider.translations('en', {
            ERRORMESSAGE: 'Invalid username or password',
            USERNAME: 'Username',
            PASSWORD: 'Password',
            SIGNIN: 'Sign in',
            SIGNUP: 'Sign up',
            SIGNOUT: 'Sign out',
            NEWACC: 'Create an account',
            ALREADYHAVE: 'Have an Account?'
        });
        $translateProvider.translations('ru', {
            ERRORMESSAGE: 'Неверное имя пользователя или пароль',
            USERNAME: 'Имя пользователя',
            PASSWORD: 'Пароль',
            SIGNIN: 'Войти',
            SIGNUP: 'Зарегистрироваться',
            SIGNOUT: 'Выйти',
            NEWACC: 'Нет учетной записи?',
            ALREADYHAVE: 'Уже есть учетная запись?'
        });
        $translateProvider.preferredLanguage('ru');
    }]);


