'use strict';

angular.module('mean.monederos').controller('MonederoController', 
    ['$scope', '$routeParams', '$location', '$modal', 'Global', 'Monederos', 'Movimientos', 
    function ($scope, $routeParams, $location, $modal, Global, Monederos, Movimientos) {
        $scope.global = Global;
        $scope.movimientos = [];
        
        $scope.create = function(cantidad) {
            showModalWaiter();

            var monedero = new Monederos.Usuario({
                objUsuario: $scope.global.user._id,
                inCantidadJugada: cantidad
            });
            
            monedero.$save(function(response) {
				setTimeout(function() {
                    hideModalWaiter();

                    $scope.addAlert('success', 'Tu monedero se ha creado correctamente.', 1000);

                    showMonedero(response);
				}, 2500);
			});
        };
    
        $scope.find = function() {
            Monederos.Monedero.query(function(monederos) {
                $scope.monederos = monederos;
            });
        };

        var showMonedero = function(monedero) {
            $scope.show = true;

            if (monedero._id) {
                $scope.monedero = monedero;

                Movimientos.All.get({
                    objMonedero: $scope.monedero._id
                }, function(movimientos) {
                    // Solucion al error por el que retornaba movimientos de otro monedero
                    for (var i = 0; i < movimientos.length; i++) {
                        if (movimientos[i].objMonedero === $scope.monedero._id) {
                            $scope.movimientos.push(movimientos[i]);
                        }
                    }
                });
            }
        };

        $scope.show = false;
        $scope.findOne = function() {
            Monederos.Usuario.get({
                usuarioId: $scope.global.user._id
            }, showMonedero);
            
        };
        
        $scope.openCrearMonedero = function() {
            
            var modalInstance = $modal.open({
                templateUrl: '/views/modal/modalMonederoCreate.html',
                controller: ModalInstanceCtrl,
                size: 'sm'
            });

            modalInstance.result.then(function(data) {
                if (data.cantidad) {
                    $scope.create(data.cantidad);
                } else {
                    //$scope.addAlert('danger', 'No puede retirar del monedero más de lo que tiene.');
                }
            });
        };
        
        $scope.openMovimiento = function(type) {
            var template = '';
            if (type === 'add') {
                template = 'modalMovimientoAdd';
            } else if (type === 'remove') {
                template = 'modalMovimientoRemove';
            }
            
            var modalInstance = $modal.open({
                templateUrl: '/views/modal/' + template + '.html',
                controller: ModalInstanceCtrl,
                size: 'sm'
            });

            modalInstance.result.then(function(data) {
                if (data.cantidad <= $scope.monedero.inTotal || type === 'add') {
                    var movimiento = new Movimientos.All({
                        idMonedero: $scope.monedero._id,
                        txConcepto: data.motivo,
                        inCantidad: parseInt(data.cantidad, 10),
                        txTipo: type,
                        inCantidadMonedero: $scope.monedero.inTotal,
                        idUsuario: $scope.global.user._id,
    					txUsuario: $scope.global.user.name,
                        isValidado: false,
                        objMonedero: $scope.monedero._id
                    });
                    
                    //Mostramos el icono de cargando
                    showModalWaiter();
                    movimiento.$save(function(response) {
                        //Ocultamos el icono de cargando
                        hideModalWaiter();
                        $scope.movimientos.push(response);
                        
                        $scope.addAlert('success', 'Su movimiento se ha registrado correctamente. ' + 
                            'Cuando se realice la transacción actualizaremos su monedero.');
                    });
                } else {
                    $scope.addAlert('danger', 'No puede retirar del monedero más de lo que tiene.');
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
        
        $scope.getCantidadMovimiento = function(cantidad, tipo) {
            var _cant = '';
            
            if (isNaN(cantidad) === true) {
                cantidad = 0;
            }
            
            if (tipo === 'add') {
                _cant = '+ ' + cantidad.toString();
            } else if (tipo === 'remove') {
                _cant = '- ' + cantidad.toString();
            } else {
                _cant = '';
            }
            
            return _cant;
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
    
        $scope.update = function() {
            var product = $scope.product;
            if (!product.updated) {
                product.updated = [];
            }
            product.updated.push(new Date().getTime());
    
            product.$update(function() {
                $location.path('products/' + product._id);
            });
        };
    
        
        */
        
        //$scope.currentCurrency = (localStorage.tmpCurrency || 'flaticon-euro30');
        //$scope.scopeTest = "TEST";
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.data = {};
    $scope.minMonedero = "0";
    
    $scope.ok = function () {
        
        $modalInstance.close($scope.data);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};