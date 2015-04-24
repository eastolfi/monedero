'use strict';

angular.module('mean.system').controller('AppController',
    ['$scope', 'Global', '$translate', '$timeout', 
    function ($scope, Global, $translate, $timeout) {
        $scope.global = Global;
        
        $scope.currentLanguage = (localStorage.tmpLanguage || 'ES');
        $scope.currentCountry = (localStorage.tmpCountry || 'Spain');
        $scope.currentCurrency = (localStorage.tmpCurrency || 'Euro');
        $scope.currentCurrencyClass = (localStorage.tmpCurrencyClass || 'flaticon-euro30');

        $scope.pageLanguages = [{
            'code': 'ES',
            'country': 'Spain',
            'img': function() {
                return 'img/icons/countries/' + this.country + '.ico';
            }
        },
            {
                'code': 'EN',
                'country': 'England',
                'img': function() {
                    return 'img/icons/countries/' + this.country + '.ico';
                }
            },
            {
                'code': 'FR',
                'country': 'France',
                'img': function() {
                    return 'img/icons/countries/' + this.country + '.ico';
                }
            },
            {
                'code': 'RO',
                'country': 'Romania',
                'img': function() {
                    return 'img/icons/countries/' + this.country + '.ico';
                }
            }];

        // Language
        $scope.changeLanguage = function (langKey) {
            localStorage.tmpLanguage = langKey;
            var _country = null;
            $scope.pageLanguages.forEach(function(item) {
                if (item.code === langKey) {
                    _country = item.country;
                }
            });
            localStorage.tmpCountry = _country;

            //$scope.currentLanguage = langKey;
            //$scope.currentCountry = _country;
//            _$scopeApp.currentLanguage = langKey;
            $scope.currentLanguage = langKey;
//            _$scopeApp.currentCountry = _country;
            $scope.currentCountry = _country;

            $translate.use(langKey);
        };
        $scope.checkCurrentLanguage = function(langKey) {
            if ($scope.currentLanguage === langKey) {
                return true;
            }
        };


        $scope.alerts = [];
        $scope.addAlert = function(_type, _msg, _duration) {
            var _pos = $scope.alerts.length;
            
            $scope.alerts.push({
                type: _type,
                msg: _msg
            });
            
            if (_duration != null && _duration > 0) {
                $timeout(function() {
				    $scope.closeAlert(_pos);
				}, _duration);
            }
        };
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
}]);