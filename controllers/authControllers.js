const usuarios = require('../models/usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Error } = require('mongoose')
const User = require("../models/usuarios")

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

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.join(allDbUsers);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(!user)
        return res.status(404).json({error: "El usuario no existe"});
        return res.json(user);
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, {password: "Cambiada"});
    return res.json({status: "Exitoso"});
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Exitoso"});
}

async function handleCreateNewUser(req, res){
    const body = req.body;
        if(
            !body || !body.email || !body.firstName || !body.lastName || !body.password || !body.address
        ){
            return res.status(400).json({msg: "Tiene que llenar todos los campos..."});
        }
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            address: body.address
        });

        return res.status(201).json({msg: "Exitoso", id: result._id});
}

module.exports={
    register, 
    login,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}