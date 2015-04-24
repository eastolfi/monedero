'use strict';

// Monederos routes use monederos controller
var monederos = require('../controllers/monederos');
var authorization = require('./middlewares/authorization');

// Monederos authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/monederos', monederos.all);
    app.post('/monederos', authorization.requiresLogin, monederos.create);
    app.get('/monederos/:monederoId', monederos.showById);
    app.get('/monederos/usuario/:usuarioId', monederos.showByUser);
    app.post('/monederos/usuario', authorization.requiresLogin, monederos.create);
    app.put('/monederos/:monederoId', authorization.requiresLogin, hasAuthorization, monederos.update);
    app.del('/monederos/:monederoId', authorization.requiresLogin, hasAuthorization, monederos.destroy);

    // Finish with setting up the monederoId param
    app.param('monederoId', monederos.monedero);

};