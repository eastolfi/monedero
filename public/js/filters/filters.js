angular.module('mean.system').filter('range', function() {
    return function(input, min, max) {
        if (min != null && max == null) {
            max = min;
            min = 0;
        }
        
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i=min; i<max; i++)
            input.push(i);
        return input;
    };
});

angular.module('mean.system').filter('dateES', function() {
    return function(_fx) {
        var _fx2 = (new Date(_fx)).toLocaleDateString();

        var _fx2spl = _fx2.split('/');
        _fx2spl.forEach(function(ele, ind, arr) {
            if (ele.length === 1) {
                arr[ind] = '0' + ele;
            }
        });
        
        _fx2 = _fx2spl.join('/');
        
        return _fx2;
    };
});
angular.module('mean.system').filter('dateESLarge', function(translateFilter) {
    return function(_fx, size) {
        //translateFilter('HOME_VISITOR_WIN_DRAW')
        var _date = new Date(_fx);
        if (_fx.indexOf('T') > -1) {
        	_date = new Date(_fx.substr(0, _fx.indexOf('T')));
        }
        
        var _day = 'DAY_' + _date.getDay();
        var _mon = 'MONTH_' + _date.getMonth();
        if (size != null && size !== '' && (size.toLowerCase() === 's' || size.toLowerCase() === 'short')) {
            _day += '_S';
            _mon += '_S';
        }
        var _d = _date.getDate().length === 1 ? '0' + _date.getDate() : _date.getDate();

        var _fecha = translateFilter(_day) + ' ' + _d + ' ' + 
                    translateFilter(_mon) + ', ' + _date.getFullYear();
        return _fecha;
    };
});