'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var MovimientoSchema = new Schema({
    txConcepto: {
        type: String,
        default: '',
        trim: true
    },
    txTipo: {   //acepta 'add' o 'remove'
        type: String,
        trim: 'true'
    },
    inCantidadMonedero: {   //antes de realizar el movimiento
        type: Number,
        default: 0
    },
    inCantidad: {
        type: Number,
        default: 0
    },
    idUsuario: {
        type: String,
        trim: 'true'
    },
    txUsuario: {
        type: String,
        trim: 'true'
    },
    isValidado: {
        type: Boolean,
        default: false
    },
    txMotivoRechazo: {
        type: String,
        default: '',
        trim: 'true'
    },
	fxFecha: {
        type: Date,
        default: Date.now
    },
    objMonedero: {
        type: Schema.Types.ObjectId,
        ref: 'Monedero'
    },
    objPremio: {
        type: Schema.Types.ObjectId,
        ref: 'Premio'
    }
});

/**
 * Validations
 */
MovimientoSchema.path('txConcepto').validate(function(title) {
    return title.length;
}, 'txConcepto cannot be blank');

/**
 * Statics
 */
MovimientoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Movimiento', MovimientoSchema);
