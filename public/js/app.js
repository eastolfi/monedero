'use strict';

var app = angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap',
        'ui.route', 'mean.system', 'mean.quinielas', 'mean.premios', 'mean.monederos',
        'mean.movimientos', 'mean.admin', 
        'pascalprecht.translate', 'angular-component']);    //'ngMockE2E'

angular.module('mean.system', ['pascalprecht.translate']);
angular.module('mean.quinielas', ['pascalprecht.translate']);
angular.module('mean.premios', ['pascalprecht.translate']);
angular.module('mean.monederos', ['pascalprecht.translate']);
angular.module('mean.movimientos', ['pascalprecht.translate']);
angular.module('mean.admin', ['pascalprecht.translate']);

angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
        .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', 
            function ($scope, $timeout, $transition, $q) { /*...*/ }])
        .directive('carousel', [function() {
            return {
        
            };
        }]);