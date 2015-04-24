'use strict';

//Premios service used for premios REST endpoint
angular.module('mean.premios').factory('Premios', ['$resource', function($resource) {
    return $resource('premios/:premioId', {
        premioId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);