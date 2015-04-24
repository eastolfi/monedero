'use strict';

// Movimientos routes use movimientos controller
var movimientos = require('../controllers/movimientos');
var authorization = require('./middlewares/authorization');

// Movimientos authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/movimientos', movimientos.all);
    app.get('/movimientos/pendientes', movimientos.pendientes);
    app.post('/movimientos', authorization.requiresLogin, movimientos.create);
    //app.get('/movimientos/:movimientoId', movimientos.all);//movimientos.show
    app.get('/movimientos/:monederoId', movimientos.showByMonedero);//movimientos.showByUser
    app.put('/movimientos/:movimientoId', authorization.requiresLogin, hasAuthorization, movimientos.update);
    app.del('/movimientos/:movimientoId', authorization.requiresLogin, hasAuthorization, movimientos.destroy);

    // Finish with setting up the movimientoId param
    app.param('movimientoId', movimientos.movimiento);

};