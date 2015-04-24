'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var MonederoSchema = new Schema({
    inCantidadJugada: {
        type: Number,
        default: 1
    },
    inTotal: {
        type: Number,
        default: 0
    },
    objUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lstMovimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'Movimiento'
    }]
});

/**
 * Validations
 */
MonederoSchema.path('inTotal').validate(function(title) {
    return title.length;
}, 'inTotal cannot be blank');

/**
 * Statics
 */
MonederoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Monedero', MonederoSchema);
