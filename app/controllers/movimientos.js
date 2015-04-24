'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Movimiento = mongoose.model('Movimiento'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.movimiento = function(req, res, next, id) {
    Movimiento.load(id, function(err, movimiento) {
        if (err) return next(err);
        if (!movimiento) return next(new Error('Failed to load movimiento ' + id));
        req.movimiento = movimiento;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var movimiento = new Movimiento(req.body);
    movimiento.user = req.user;

    movimiento.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                movimiento: movimiento
            });
        } else {
            res.jsonp(movimiento);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    
    var movimiento = req.movimiento;

    movimiento = _.extend(movimiento, req.body);

    movimiento.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                movimiento: movimiento
            });
        } else {
            res.jsonp(movimiento);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var movimiento = req.movimiento;

    movimiento.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                movimiento: movimiento
            });
        } else {
            res.jsonp(movimiento);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.movimiento);
};

exports.showByMonedero = function(req, res) {
    Movimiento.find({idMonedero: req.params.monederoId}, function(err, movimientos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(movimientos);
        }
    });
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Movimiento.find().sort('-created').populate('user', 'name username').exec(function(err, movimientos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(movimientos);
        }
    });
};

/**
 * List of Articles
 */
exports.pendientes = function(req, res) {
    Movimiento.find({'isValidado': false}).populate('objMonedero').sort('-created').exec(function(err, movimientos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(movimientos);
        }
    });
};