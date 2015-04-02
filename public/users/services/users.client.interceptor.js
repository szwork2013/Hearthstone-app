'use strict';

// register the interceptor as a service
angular.module('users').factory('authInterceptor', ['$injector', '$q', 'AuthTokenFactory',
    function ($injector, $q, AuthTokenFactory) {
        return {
            'request': addToken,
            'responseError': function (response) {
                if (response.status === 401) {
                    var stateService = $injector.get('$state');
                    stateService.go('signin');
                    console.log('response 401');
                }
                return $q.reject(response);
            }

            //'responseError': function(response) {
            //    if(response.status === 401 || response.status === 403) {
            //        $state.go('signin');
            //    }
            //    console.log('responseError');
            //    return $q.reject(response);
            //}
        };

        /**
         * Add Token header to every request
         *
         */
        function addToken(config) {
            var token = AuthTokenFactory.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }]
);
