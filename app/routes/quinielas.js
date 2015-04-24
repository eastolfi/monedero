'use strict';

// Quinielas routes use quinielas controller
var quinielas = require('../controllers/quinielas');
var authorization = require('./middlewares/authorization');

// Quinielas authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/quinielas', quinielas.all);
    app.post('/quinielas', authorization.requiresLogin, quinielas.create);
    app.get('/quinielas/:quinielaId', quinielas.show);
    app.put('/quinielas/:quinielaId', authorization.requiresLogin, hasAuthorization, quinielas.update);
    app.del('/quinielas/:quinielaId', authorization.requiresLogin, hasAuthorization, quinielas.destroy);

    // Finish with setting up the quinielaId param
    app.param('quinielaId', quinielas.quiniela);

};