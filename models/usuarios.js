// Collection schema
// Autenticacion del login con la BD - REGISTRO
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String, 
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String, 
        required: true,
    },
    address:{
        type: String,
    }
}, {timestamps: true})

const usuarioModel = mongoose.model('usuarioModel', usuarioSchema)
module.exports = usuarioModel