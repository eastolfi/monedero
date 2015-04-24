'use strict';

//Products service used for products REST endpoint
angular.module('mean.quinielas').factory('Quinielas', ['$resource', function($resource) {
    return $resource('quinielas/:quinielaId', {
        quinielaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);