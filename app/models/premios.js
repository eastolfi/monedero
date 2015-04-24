'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var PremioSchema = new Schema({
    inCantidad: {						/* Cantidad recibida en el premio */
        type: Number,
        default: 0
    },
	objQuiniela: {
        type: Schema.Types.ObjectId,
        ref: 'Quiniela'
    },
    lstMovimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'Movimiento'
    }]
});

/**
 * Validations
 */
PremioSchema.path('inCantidad').validate(function(title) {
    return title.length;
}, 'inCantidad cannot be blank');

/**
 * Statics
 */
PremioSchema.statics.load = function(id, cb) {
    /*this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);*/
	this.findOne({
		_id: id
	}).exec(cb);
};

mongoose.model('Premio', PremioSchema);
