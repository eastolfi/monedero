'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/index', {
            templateUrl: 'views/index.html'
        }).
        when('/monedero', {
            templateUrl: 'views/monederos/view.html'
        }).
        when('/monederos', {
            templateUrl: 'views/monederos/list.html'
        }).
        when('/movimientos/pendientes', {
            templateUrl: 'views/movimientos/pendientes.html'
        }).
		when('/quinielas', {
			templateUrl: 'views/quinielas/list.html'
		}).
		when('/quinielas/create', {
			templateUrl: 'views/quinielas/create.html'
		}).
		when('/quinielas/:quinielaId', {
            templateUrl: 'views/quinielas/view.html'
        }).
		when('/quinielas/:quinielaId/edit', {
            templateUrl: 'views/quinielas/edit.html'
        }).
        when('/administrate', {
            templateUrl: 'views/about.html'
        }).
        when('/admin', {
            templateUrl: 'views/admin/home.html'
        }).
        when('/admin/users', {
            templateUrl: 'views/admin/userList.html'
        }).
        when('/', {
            redirectTo: '/index'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.module('mean').config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage(localStorage.tmpLanguage || 'ES');
    $translateProvider.useLocalStorage();
});



/*
angular.module('mean').config(function ($httpProvider, fileUploadProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    fileUploadProvider.defaults.redirect = window.location.href.replace(
        /\/[^\/]*$/,
        '/cors/result.html?%s'
    );
    // Demo settings:
    angular.extend(fileUploadProvider.defaults, {
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
    });
});*/