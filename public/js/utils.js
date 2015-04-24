$(document).ready(function() {
	setupSidebarScrollable("#right-menu");
    $(document).on('DOMNodeInserted', function(e){
        if (e.target&& e.target.id === 'right-menu') {
        	// Setup Components
            setupSidebarScrollable("#right-menu");
            //setupModalWaiter();
        }
    });
});

function setupSidebarScrollable(sidebarSelector) {
	if ($(sidebarSelector).length <= 0) return;
	var offset = $(sidebarSelector).offset();
	var topPadding = 50;
	var totalHeight = $(sidebarSelector).height() + $(sidebarSelector).offset().top;
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var lengthFromTop = scroll + totalHeight - topPadding;
		
		if (lengthFromTop <= document.body.clientHeight) {
			if (scroll > offset.top) {
				$(sidebarSelector).stop().animate({
					marginTop: $(window).scrollTop() - offset.top + topPadding
				});
			} else {
				$(sidebarSelector).stop().animate({
					marginTop: 0
				});
			};
		}
	});
}

function hideLoadingIFrame(iFrameId) {
	var _id = iFrameId.split('-');
	_id[0] = 'loading';
	_id = _id.join('-');
	//var _id = iFrameId.split('-')[1] + '-' + iFrameId.split('-')[2];
	$('#' + _id).css('display', 'none');
	$('#' + iFrameId).css('display', 'inline-block');
}

var showModalWaiter = function() {
	$('#modalWaiter').modal({
		backdrop: 'static',
  		keyboard: false
	});
};

var hideModalWaiter = function() {
	$('#modalWaiter').modal('hide');
};


var realizarEscrutinio = function() {
	//var q = [['1', 'X'], ['1', '2']];                 //2^2 = 4 combinaciones
	//var q = [['1', 'X'], ['1', '2'], ['X', '2']];     //2^3 = 8 combinaciones
	//var q = [['1', 'X'], ['X', '2'], ['X']];          //2^2 = 4 combinaciones
	var q = [['1', 'X'], ['1', 'X'], ['X'], ['X'], ['1', 'X'], ['1', 'X'], ['1', 'X'], 
	    ['1', 'X'], ['1', 'X'], ['1', 'X'], ['1', 'X'], ['1', 'X'], ['1', '2'], ['1', 'X']];
	// TODO -> triples
	
	var combs = [],
	    combinaciones = [];
	var dobles = 0;
	
	for (var i = 0; i < q.length; i++) {
	    var qi = q[i];
	    
	    if (qi.length == 2) {
	        dobles++;
	    }
	}
	var combsPos = Math.pow(2, dobles);
	
	for (var j = 0; j < q.length; j++) {
	    var cr = Math.pow(2, dobles-j) / 2;
	    var nr = combsPos / cr;
	    var s;
	    for (var k = 0; k < nr; k++) {
	        if (s > 1) s = 0;
	        
	        var f = Math.floor(k * cr),
	            t = (k + 1) * cr; //Usar <, y no <=
	            
	        for (var l = f; l < t; l++) {
	            if (combs[l] == null) combs[l] = [];
	            
	            if (q[j][s] != null) combs[l][j] = q[j][s];
	        }
	        
	        s++;
	    }
	}
	
	console.log(combs);
	var c = combs.length - 1;
	for (var i = 0; i < combs.length; i++) {
	    combinaciones[i] = combs[c].join('');
	    c--;
	}
	
	console.log(combinaciones);
	
	
	var buscarRepetidos = function(array) {
	    var tmp = [],
	        rep = [];
	    for (var i = 0; i < array.length; i++) {
	        if (tmp.indexOf(array[i]) === -1) tmp.push(array[i]);
	        else rep.push(array[i]);
	    }
	    
	    if (rep.length > 0) console.log('Se han encontrado ' + rep.length + ' registros repetidos.');
	    
	    return rep;
	};
};