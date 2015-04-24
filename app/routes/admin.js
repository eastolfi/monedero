'use strict';

var admin = require('../controllers/admin');
var authorization = require('./middlewares/authorization');

var hasAuthorization = function(req, res, next) {
	if (!req.user.admin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

var requiresAdminLogin = function(req, res, next) {
	if (!req.isAuthenticated() || !req.user.admin) {
        //return res.send(401, admin.requestAdmin);
        return res.render('admin/adminLogin');
    } else {
        next();
    }
};

module.exports = function(app) {
    app.get('/admin', requiresAdminLogin, admin.adminIndex);
    app.get('/admin/users', authorization.requiresLogin, hasAuthorization, admin.usersAll);
    app.get('/admin/users/:articleId', admin.showUsers);
    
    app.param('userId', admin.user);
};