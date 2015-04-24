'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Premio = mongoose.model('Premio'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.premio = function(req, res, next, id) {
    Premio.load(id, function(err, premio) {
        if (err) return next(err);
        if (!premio) return next(new Error('Failed to load premio ' + id));
        req.premio = premio;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var premio = new Premio(req.body);
    
    if (premio.lstMovimientos == null || premio.lstMovimientos.length === 0) {
        //crear movimientos
    }

    premio.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                premio: premio
            });
        } else {
            res.jsonp(premio);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var premio = req.premio;

    premio = _.extend(premio, req.body);
    
    //update movimientos

    premio.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                premio: premio
            });
        } else {
            res.jsonp(premio);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var premio = req.premio;

    premio.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                premio: premio
            });
        } else {
            res.jsonp(premio);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.premio);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Premio.find().sort('-created').populate('user', 'name username').exec(function(err, premios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(premios);
        }
    });
};