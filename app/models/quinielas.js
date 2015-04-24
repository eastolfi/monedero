'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var QuinielaSchema = new Schema({
	inJornada: Number,
	/* Length: 15 */
	partidos: [{
        /* Equipo de casa */
		txEquipo1: {
			type: String,
			default: '',
			trim: true
		},
		/* Equipo visitante */
		txEquipo2: {
			type: String,
			default: '',
			trim: true
		},
		/* Resultado del partido */
		txResultado: {
			type: String,
			default: '',
			trim: true
		},
		/* Partido acertado en la quiniela */
		isAcierto: {
            type: Boolean,
            default: false
		},
		txResultadoCorrecto: {
			type: String
		}
	}],
	/* Precio de la quiniela, de momento jugamos a 128€ */
    inPrecio: {
        type: Number,
        default: 128
    },
    /* Fecha en que se echó la quiniela */
	fxFecha: {
        type: Date,
        default: Date.now
    },
	/* Premio recibido, si es que ha tocado */
    objPremio: {
        type: Schema.Types.ObjectId,
        ref: 'Premio',
    }
});

/**
 * Validations
 */
QuinielaSchema.path('fxFecha').validate(function(title) {
    return title.length;
}, 'fxFecha cannot be blank');

/**
 * Statics
 */
QuinielaSchema.statics.load = function(id, cb) {
    /*this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);*/
	this.findOne({
		_id: id
	}).exec(cb);
};

mongoose.model('Quiniela', QuinielaSchema);
