'use strict';

angular.module('mean.system').controller('HeaderController',
    ['$scope', '$filter', 'Global', '$translate',
    function ($scope, $filter, Global, $translate) {
        
        var _$scopeParent = $scope.$parent,
            _$scopeApp = _$scopeParent.$parent;

        $scope.getLanguageImg = function(country) {
            return 'img/icons/countries/' + country + '.ico';
        };

        /*
        $scope.currencies = [{
           'currency': 'Euro',
           'class': 'flaticon-euro30'
        },
        {
           'currency': 'Dolar',
           'class': 'flaticon-dollar97'
        },
        {
           'currency': 'Libra',
           'class': 'flaticon-pound12'
        },
        {
           'currency': 'Ron',
           'class': 'flaticon-romania1'
        }];
        */
        $scope.global = Global;
        
        if ($scope.global.user) {
            $scope.welcomeUser = {
                username: $scope.global.user.name,
                genreText: 'o'
            };
        }
    
        $scope.menu = [{
            'title': 'MENU_INDEX',
            'link': 'index'
		}];
		
        $scope.menuUser = [
        {
            'title': 'MENU_MONEDERO',
            'link': 'monedero'
        },
        {
            'title': 'MENU_QUINIELAS',
            'link': 'quinielas'
        }
        ];
        $scope.menuAdmin = [
        {
            'title': 'MENU_QUINIELA_NEW',
            'link': 'quinielas/create'
        },
        {
            'title': 'MENU_MOVIMIENTOS_PEND',
            'link': 'movimientos/pendientes'
        }];
        
        $scope.menuAdminDropdown = [{
            'title': 'MENU_ADMINISTRATE',
            'link': 'admin'
        }];
        

        
        // Currency
        $scope.changeCurrency = function (curr) {
            localStorage.tmpCurrency = curr;
            var _curr = null;
            $scope.currencies.forEach(function(item) {
                if (item.currency === curr) {
                    _curr = item.class;
                }
            });
            localStorage.tmpCurrencyClass = _curr;
            
            _$scopeApp.currentCurrency = curr;
            _$scopeApp.currentCurrencyClass = _curr;
            
            //$translate.use(curr);
            //change currency
        };
        $scope.checkCurrentCurrency = function(curr) {
            if ($scope.currentCurrency === curr) {
                return true;
            }
        };
        
        $scope.isCollapsed = false;
}]);