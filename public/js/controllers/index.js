'use strict';

angular.module('mean.system').controller('IndexController',
    ['$scope', 'Global', '$translate', 
    function ($scope, Global, $translate) {
        $scope.global = Global;
        
}]);