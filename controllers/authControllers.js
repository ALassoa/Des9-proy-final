const usuarios = require('../collections/usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')

// Función para el proceso de registro 

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                Error: err
            })
        }

        let usuario = new usuario({
            email: req.body.email,
            password: hashedPass
        })
        usuario.save().then(usuarios => {
            res.json({
                message: '¡El usuario se agregó satisfactoriamente!'
            })
        })
        .catch(Error =>{
            res.json({
                message: 'Ocurrió un error'
            })
        })
    })
}

const login = (req, res, next) => {
    let username = req.body.email
    let password = req.body.password

    usuarios.findOne({$or: [{email:username}]})
    .then(usuario => {
        if(usuario){
            bcrypt.compare(password, usuario.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({email: usuario.email}, 'verySecretValue', {expiresIn: '300s'})
                    res.json({
                        message: 'Login exitoso', token
                    })
                }
                else{
                    res.json({
                        message: 'Contraseña incorrecta'
                    })
                }
            })
        }
        else{
            res.json({
                message:'El usuario no existe'
            })
        }
    })
}

module.exports={
    register, login
}