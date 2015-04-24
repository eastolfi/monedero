'use strict';

angular.module('mean.movimientos').controller('MovimientosController', 
    ['$scope', '$routeParams', '$location', '$modal', 'Global', 'Movimientos', 'Monederos', 
    function ($scope, $routeParams, $location, $modal, Global, Movimientos, Monederos) {
        $scope.global = Global;
        
        $scope.find = function() {
            Movimientos.query(function(movimientos) {
                $scope.movimientos = movimientos;
            });
        };
        
        $scope.findPendientes = function() {
            Movimientos.Pendientes.get(function(movimientos) {
                $scope.movimientosPendientes = movimientos;
            });
        };
        
        $scope.actualizarListaMovimientos = function(movimiento) {
            if (movimiento.isValidado === true) {
                for (var i = 0; i < $scope.movimientosPendientes.length; i++) {
                    if ($scope.movimientosPendientes[i]._id === movimiento._id) {
                        //Ocultamos el icono de cargando
                        hideModalWaiter();
                        
                        $scope.movimientosPendientes.splice(i, 1);
                        
                        $scope.addAlert('success', $scope.alertText);
                    }
                }
            }
        };
        
        $scope.verificar = function(_movimiento) {

            //Mostramos el icono de cargando
            showModalWaiter();
            
            var updateMonedero = function(monedero) {
                if (monedero._id) {
                    if (_movimiento.txTipo === 'add') {
						monedero.inTotal += _movimiento.inCantidad;
					} else if (_movimiento.txTipo === 'remove') {
						monedero.inTotal -= _movimiento.inCantidad;
					}
					
                    monedero.$update(function(response) {
                        if (response && _movimiento) {
                            var _mov = new Movimientos.Movimiento(_movimiento);
                            _mov.isValidado = true;
                            
                            if (typeof _mov.objMonedero === 'object') {
                                _mov.objMonedero = _mov.objMonedero._id;
                            }
                            
                            $scope.alertText = 'El movimiento se ha validado correctamente.';
                            _mov.$update($scope.actualizarListaMovimientos);
                        }
                    });
                    
                }
            };
            
            Monederos.Monedero.get({ monederoId: _movimiento.idMonedero }, updateMonedero);
        };
        
        $scope.rechazar = function(_movimiento) {
            var modalInstance = $modal.open({
                templateUrl: '/views/modal/modalMovimientoRechazar.html',
                controller: ModalInstanceCtrl,
                size: 'sm'
            });

            modalInstance.result.then(function(data) {
                if (data) {
                    var _mov = new Movimientos.Movimiento(_movimiento);
                    _mov.isValidado = true;
                    _mov.txMotivoRechazo = data.motivo;
                    
                    if (typeof _mov.objMonedero === 'object') {
                        _mov.objMonedero = _mov.objMonedero._id;
                    }
                            
                    showModalWaiter();
                    $scope.alertText = 'El movimiento ha sido rechazado';
                    _mov.$update($scope.actualizarListaMovimientos);
                    /*
                    _mov.$update(function(movimiento) {
                        if (movimiento._id) {
                            hideModalWaiter();
                            $scope.addAlert('success', 'El movimiento ha sido rechazado.');
                        }
                    });
                    */
                }
            });
        };
        
        $scope.create = function() {
            var movimiento = new Movimientos({
                idUsuario: $scope.global.user._id
            });
            
            movimiento.$save(function(response) {
				$location.path('movimiento');
			});
        };
    
        $scope.show = false;
        $scope.findOne = function() {
            Movimientos.get({
                usuarioId: $scope.global.user._id
            }, function(movimiento) {
                $scope.show = true;
				
				if (movimiento._id) {
					$scope.movimiento = movimiento;
					// find movimientos
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
        
        /*
        $scope.remove = function(product) {
            if (product) {
                product.$remove();
    
                for (var i in $scope.products) {
                    if ($scope.products[i] === product) {
                        $scope.products.splice(i, 1);
                    }
                }
            }
            else {
                $scope.product.$remove();
                $location.path('products');
            }
        };
    
        
    
        
        */
        
        //$scope.currentCurrency = (localStorage.tmpCurrency || 'flaticon-euro30');
        //$scope.scopeTest = "TEST";
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.data = {};
    
    //$scope.motivo = "";
    //$scope.cantidad = 0;

    $scope.ok = function () {
        
        $modalInstance.close($scope.data);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};