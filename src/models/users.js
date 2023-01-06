const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome: { 
        type: String 
    },
    email: { 
        type: String 
    },
    senha: { 
        type: String
    },
    
},{
    timestamps: true
})

const users = mongoose.model('Users', UsersSchema);


module.exports = users


