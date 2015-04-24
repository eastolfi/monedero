'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Quiniela = mongoose.model('Quiniela'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.quiniela = function(req, res, next, id) {
    Quiniela.load(id, function(err, quiniela) {
        if (err) return next(err);
        if (!quiniela) return next(new Error('Failed to load quiniela ' + id));
        req.quiniela = quiniela;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var quiniela = new Quiniela(req.body);
    quiniela.user = req.user;

    quiniela.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                quiniela: quiniela
            });
        } else {
            res.jsonp(quiniela);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var quiniela = req.quiniela;

    quiniela = _.extend(quiniela, req.body);

    quiniela.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                quiniela: quiniela
            });
        } else {
            res.jsonp(quiniela);
        }
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var quiniela = req.quiniela;

    quiniela.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                quiniela: quiniela
            });
        } else {
            res.jsonp(quiniela);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    Quiniela.findOne({_id: req.params.quinielaId}).populate('objPremio').exec(function(err, quiniela) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(quiniela);
        }
    });
    //res.jsonp(req.quiniela);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Quiniela.find().sort('-created').populate('objPremio').exec(function(err, quinielas) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(quinielas);
        }
    });
};