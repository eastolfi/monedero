'use strict';

//Products service used for products REST endpoint
angular.module('mean.monederos').factory('Monederos', ['$resource', function($resource) {
    return {
        Monedero: 
            $resource('monederos/:monederoId',
            {
                monederoId: '@_id'
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        ),
        Usuario: $resource('monederos/usuario/:usuarioId', 
            {
                usuarioId: '@_id'
            }
        )
    };
}]);