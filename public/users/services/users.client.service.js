'use strict';

angular.module('users').factory('Users', ['$http', '$state', 'API_URL',
    function($http, $state, API_URL){
        return {
            signup: function(data, success, error) {
                $http.post(API_URL + '/signup', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(API_URL + '/signin', data).success(success).error(error)
            }
        };
    }
]);