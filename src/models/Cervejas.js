const mongoose = require('mongoose');
const user = require('./users');
const DBSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome: { 
        type: String,
        required: true
    },
    tipo: { 
        type: String,
        required: true 
    },
    quantidade: { 
        type: String,
        required: true 
    },
    teorAlcoolico: {
        type: String,
        required: true
    },
    nota: { 
        type: Number,
        required: true
    },
    descricao: { 
        type: String,
        required: true 
    },
    fabricante: { 
        type: String,
        required: true 
    },
    pais: { 
        type: String,
        required: true 
    },
    EditadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    }

},{
    timestamps: true
})

const cervejaria = mongoose.model('Cervejas', DBSchema);

module.exports = cervejaria


