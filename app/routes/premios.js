'use strict';

// Premios routes use premios controller
var premios = require('../controllers/premios');
var authorization = require('./middlewares/authorization');

// Premios authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/premios', premios.all);
    app.post('/premios', authorization.requiresLogin, premios.create);
    app.get('/premios/:premioId', premios.show);
    app.put('/premios/:premioId', authorization.requiresLogin, hasAuthorization, premios.update);
    app.del('/premios/:premioId', authorization.requiresLogin, hasAuthorization, premios.destroy);

    // Finish with setting up the premioId param
    app.param('premioId', premios.premio);

};