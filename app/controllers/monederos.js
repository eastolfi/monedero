'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Monedero = mongoose.model('Monedero'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.monedero = function(req, res, next, id) {
    Monedero.load(id, function(err, monedero) {
        if (err) return next(err);
        if (!monedero) return next(new Error('Failed to load monedero ' + id));
        req.monedero = monedero;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var monedero = new Monedero(req.body);
    monedero.user = req.user;

    monedero.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                monedero: monedero
            });
        } else {
            res.jsonp(monedero);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var monedero = req.monedero;

    monedero = _.extend(monedero, req.body);

    monedero.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                monedero: monedero
            });
        } else {
            res.jsonp(monedero);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var monedero = req.monedero;

    monedero.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                monedero: monedero
            });
        } else {
            res.jsonp(monedero);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.monedero);
};

exports.showById = function(req, res) {
    Monedero.findOne({_id: req.params.monederoId}, function(err, monedero) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(monedero);
        }
    });
};

exports.showByUser = function(req, res) {
    Monedero.findOne({objUsuario: req.params.usuarioId}, function(err, monedero) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(monedero);
        }
    });
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Monedero.find().sort('-created').populate('user', 'name username').exec(function(err, monederos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(monederos);
        }
    });
};