// Autenticacion del login con la BD - REGISTRO
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
}, {timestamps: true})

const usuarioModel = mongoose.model('usuarioModel', usuarioSchema)
module.exports = usuarioModel