'use strict';

//http://www.niheroesnidioses.com/quiniela/index.php?quiniela=Espa%C3%B1a&temporada=2014&jornada=1

angular.module('mean.quinielas').controller('QuinielasController', 
    ['$scope', '$routeParams', '$location', '$modal', 'Global', 
        'Quinielas', 'Monederos', 'Movimientos', 'Premios', 
    function ($scope, $routeParams, $location, $modal, Global, 
        Quinielas, Monederos, Movimientos, Premios) {
        $scope.global = Global;
        
        /* DATEPICKER */
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            
            $scope.opened = true;
        };
        
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        
        $scope.format = 'dd-MMMM-yyyy';
        /* DATEPICKER */
        
		Quinielas.prototype.getFechaLocal = function() {
			return new Date(this.fxFecha).toLocaleDateString();
		};
		Quinielas.prototype.getFechaTextoLocal = function() {
			return (new Date(this.fxFecha)).toDateString();
		};
		Quinielas.prototype.getShortResumen = function() {
			var resumen = '';

			for (var i = 0; i < this.partidos.length; i++) {
				resumen += this.partidos[i].txEquipo1 + ' - ' + this.partidos[i].txEquipo2;
				if (i < this.partidos.length - 1) {
					resumen += ', ';
				}
			}
			
			if (resumen.length > 80) {
				var comma = resumen.substr(0, 80).lastIndexOf(',');
				
				resumen = resumen.substr(0, comma);
				resumen += ', ...';
			}
			
			return resumen;
		};
		
		$scope.getResultadosPleno = function() {
            var _map = [{
                'resCode': 'P0',
	            'resText': '0_GOL'
            },
            {
                'resCode': 'P1',
	            'resText': '1_GOL'
            },
            {
                'resCode': 'P2',
	            'resText': '2_GOL'
            },
            {
                'resCode': 'PM',
	            'resText': '3_MORE_GOL'
            }];
            
            return _map;
		};
		
		$scope.getResultados = function() {
		    var _map = [{
	            'resCode': '1',
	            'resText': 'HOME_WIN'
	        },
	        {
	            'resCode': 'X',
	            'resText': 'DRAW'
	        },
	        {
	            'resCode': '2',
	            'resText': 'VISITOR_WIN'
	        },
	        {
	            'resCode': '1X',
	            'resText': 'HOME_WIN_DRAW'
	        },
	        {
	            'resCode': '12',
	            'resText': 'HOME_VISITOR_WIN'
	        },
	        {
	            'resCode': 'X2',
	            'resText': 'VISITOR_WIN_DRAW'
	        },
	        {
	            'resCode': '1X2',
	            'resText': 'HOME_VISITOR_WIN_DRAW'
	        }];
	        
	        return _map;
		};
		$scope.maxPartidos = 15;
	    $scope.partidosTmp = [];
	    $scope.resultadoPlenoEq1 = "";
	    $scope.resultadoPlenoEq2 = "";
	    $scope.inCantidadPremio = null;
		$scope.init = function() {
		    for (var i = 0; i < $scope.maxPartidos; i++) {
		        $scope.partidosTmp[i] = {};
		    }
		};

        $scope.importar = function() {
            var modalInstance = $modal.open({
                templateUrl: '/views/modal/modalQuinielaImportar.html',
                controller: ModalInstanceCtrl,
                size: 'sm'
            });

            modalInstance.result.then(function(data) {
                if (data) {
                    var info = data.result;
                    var infQuin = info.split('@@')[0];
                    var infPart = info.split('@@')[1];

                    $scope.inJornada = Number.parseInt(infQuin.split('@')[0]);
                    var _d = infQuin.split('@')[1];
                    $scope.fxFecha = new Date(_d.split('/')[2], _d.split('/')[1] - 1, _d.split('/')[0]);
                    $scope.inPrecio = Number.parseInt(infQuin.split('@')[2]);

                    /*
                    var quiniela = $scope.quiniela;

                    if (data.result === 'OK') {
                        quiniela.partidos[indicePartido].isAcierto = true;
                    } else {
                        quiniela.partidos[indicePartido].isAcierto = false;
                        quiniela.partidos[indicePartido].txResultadoCorrecto = data.result;
                    }
                    */
                }
            });
        };

        $scope.create = function() {
            showModalWaiter();
            
			$scope.partidosTmp[$scope.maxPartidos - 1].txResultado = 
			    $scope.resultadoPlenoEq1 + '@' + $scope.resultadoPlenoEq2;
            var quiniela = new Quinielas({
                inJornada: this.inJornada,
				partidos: $scope.partidosTmp,
				fxFecha: this.fxFecha
            });
            
			if (this.inPrecio != null && this.inPrecio != '' && this.inPrecio != 0) {
				quiniela.inPrecio = this.inPrecio;
			}

			if (this.idPremio != null && this.idPremio != '' && this.idPremio != 0) {
				var premio = new Premios({
					inCantidad: this.idPremio
				});
				
				var idPremio = null;
				premio.$save(function(resp) {
					if (resp != null) {
						idPremio = resp._id;
					}
				});
				
				if (idPremio != null) {
					quiniela.idPremio = idPremio;
				} else {
					// Error
				}
			}
			
			quiniela.$save(function(response) {
			    hideModalWaiter();
			    
				$location.path('quinielas');
			});
			
        };
    
        $scope.remove = function() {
            if ($scope.quiniela) {
                $scope.quiniela.$remove();
    
                $location.path('quinielas');
            }
        };
    
        $scope.update = function() {
            var quiniela = $scope.quiniela;
            quiniela.partidos[$scope.maxPartidos - 1].txResultado = 
			    $scope.resultadoPlenoEq1 + '@' + $scope.resultadoPlenoEq2;
			    
            if (!quiniela.updated) {
                quiniela.updated = [];
            }
            quiniela.updated.push(new Date().getTime());
			    
			var _premio = null,
			    _fnc = '';
            if ($scope.inCantidadPremio != null) {
                updateNewPremio(quiniela);
                
            } else if (quiniela.objPremio != null && quiniela.objPremio.inCantidad != null &&
                quiniela.objPremio.inCantidad !== '' && parseInt(quiniela.objPremio.inCantidad) > 0) {
                    
                _premio = new Premios(quiniela.objPremio);
                _fnc = '$update';
            }
            if (_premio != null) {
                _premio[_fnc](function(response) {
                    if (response) {
                        quiniela.objPremio = response._id;
                        /***
                        quiniela.$update(function() {
                            $location.path('quinielas/' + quiniela._id);
                        });*/
                    }
                });
            } else {
                if (quiniela.objPremio != null) {
                    _premio = new Premios(quiniela.objPremio);
                    _premio.$remove();
                }
                quiniela.objPremio = null;
                /****
                quiniela.$update(function() {
                    $location.path('quinielas/' + quiniela._id);
                });*/
            }
            
        };
        
        var saveAll = function(array, cb) {
            var total = array.length,
                arr = array,
                result = [];
            
            
            var saveRec = function() {
                var doc = arr.pop();
                doc.$save(function(resp) {
                    result.push(resp);
                    
                    if (--total) {
                        saveRec();
                    } else {
                        if (cb) cb();
                    }
                });
            };
            
            saveRec();
        };
        
        var updateNewPremio = function(quiniela) {
            var q = quiniela;
            var costeQuiniela = q.inPrecio,
                cantidadPremio = parseFloat($scope.inCantidadPremio.replace(',', '.')).toFixed(2),
                jornada = q.inJornada;
            
            var _premio = new Premios({
                inCantidad: cantidadPremio,
                objQuiniela: quiniela._id
            });
            
            _premio.$save(function(response) {
                Monederos.Monedero.query(function(monederos) {
                    if (monederos) {
                        var _movs = [];
                        
                        for (var i = 0; i < monederos.length; i++) {
                            var monedero = monederos[i],
                                premioMonedero = monedero.inCantidadJugada * cantidadPremio / costeQuiniela;
                            
                            _movs.push(new Movimientos.All({
                                txConcepto: 'Premio de la quiniela de la jornada ' + jornada,
                                txTipo: 'add',
                                inCantidadMonedero: monedero.inTotal,
                                inCantidad: parseFloat(premioMonedero).toFixed(2),
                                idUsuario: $scope.global.user._id,
        					    txUsuario: $scope.global.user.name,
        					    isValidado: false,
        					    objMonedero: monedero._id,
        					    objPremio: response._id
                            }));
                        }
                        
                        saveAll(_movs, function() {
                            q.objPremio = response._id;
                            q.$update(function() {
                                $location.path('quinielas/' + q._id);
                            });
                        });
                    }
                });
            });
        };
        
        var updatePremio = function() {
            
        };
        
        var updateSinPremio = function() {
            
        };
    
        $scope.find = function() {
            showModalWaiter();
            Quinielas.query(function(quinielas) {
                hideModalWaiter();
                
                $scope.quinielas = quinielas;
            });
        };
    
        $scope.findOne = function() {
            showModalWaiter();
            Quinielas.get({
                quinielaId: $routeParams.quinielaId
            }, function(quiniela) {
                hideModalWaiter();
                
                $scope.quiniela = quiniela;
                
                var resultadoPleno = quiniela.partidos[$scope.maxPartidos - 1].txResultado.split('@');
                $scope.resultadoPlenoEq1 = resultadoPleno[0];
	            $scope.resultadoPlenoEq2 = resultadoPleno[1];
                $scope.textPlenoEq1 = resultadoPleno[0].replace('P', '');
	            $scope.textPlenoEq2 = resultadoPleno[1].replace('P', '');
            });
        };
        
        $scope.verificar = function(indicePartido) {
            var modalInstance = $modal.open({
                templateUrl: '/views/modal/modalQuinielaVerificar.html',
                controller: ModalInstanceCtrl,
                size: 'sm'
            });

            modalInstance.result.then(function(data) {
                if (data) {
                    var quiniela = $scope.quiniela;
                    
                    if (data.result === 'OK') {
                        quiniela.partidos[indicePartido].isAcierto = true;
                    } else {
                        quiniela.partidos[indicePartido].isAcierto = false;
                        quiniela.partidos[indicePartido].txResultadoCorrecto = data.result;
                    }
                }
            });
        };
        
        $scope.converPrice = function(price) {
            if ($scope.currentCurrency == 'Euro') {
                return (Math.round((price * 1) * 100, 2) / 100);
            } else if ($scope.currentCurrency == 'Dolar') {
                return (Math.round((price * 1.38857) * 100, 2) / 100);
            } else if ($scope.currentCurrency == 'Libra') {
                return (Math.round((price * 0.828960) * 100, 2) / 100);
            } else if ($scope.currentCurrency == 'Ron') {
                return (Math.round((price * 4.49484) * 100, 2) / 100);
            }
            return price;
        };
        
        //$scope.currentCurrency = (localStorage.tmpCurrency || 'flaticon-euro30');
        //$scope.scopeTest = "TEST";
}]);


var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.data = {};
    
    $scope.ok = function () {
        
        $modalInstance.close($scope.data);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};