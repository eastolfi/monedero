'use strict';

//Products service used for products REST endpoint
angular.module('mean.movimientos').factory('Movimientos', ['$resource', function($resource) {
    return {
        All: $resource('movimientos/:monederoId', 
            {
                monederoId: '@_id'
            },
            {
                get: {
                    method: 'GET',
                    isArray: true
                }
            }
        ),
        Pendientes: $resource('/movimientos/pendientes', 
            { }, 
            {
                get: {
                    method: 'GET',
                    isArray: true
                }
            }
        ),
        Movimiento: $resource('/movimientos/:movimientoId', 
            {
                movimientoId: '@_id'
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        )
    };
}]);