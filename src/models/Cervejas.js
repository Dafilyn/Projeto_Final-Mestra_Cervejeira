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
    },
    quantidade: { 
        type: String,
    },
    teorAlcoolico: {
        type: String,
    },
    nota: { 
        type: Number,
    },
    descricao: { 
        type: String,
    },
    fabricante: { 
        type: String, 
    },
    pais: { 
        type: String,
    }
},{
    timestamps: true
})

const cervejaria = mongoose.model('Cervejas', DBSchema);

module.exports = cervejaria


