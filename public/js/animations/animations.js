'use strict';

angular.module('mean.system').animation(".enter-slide", function () {
    return {
        setup: function (element) {
            element.hide();
        },
        start: function (element, done, memo) {
            try{
                element.slideDown(function () {
                    done();
                });
            }
            catch(ex){}
        }
    };
});

angular.module('mean.system').animation(".leave-slide", function () {
    return {
        start: function (element, done, memo) {
            element.slideUp(function () {
                done();
            });
        }
    };
});