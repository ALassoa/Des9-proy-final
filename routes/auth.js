const express = require('express')
const Router = express.Router()

const authControllers = require('../controllers/authControllers')

Router.get("/", async(req, res) =>{
    const html = `<ul> 
                    ${allDbUsers
                    .map((user)=> `<li>${user.email}</li>`)
                    .join("")}
                </ul>`;
                res.send(html);
})

Router.get("/", async (req, res) => {
    const allDbUsers = await User.find({});
    return res.join(allDbUsers);
});

Router
    .route("/:id")
    .get(async (req, res)=>{
        const user = await User.findById(req.params.id);
            if(!user)
                return res.status(404).json({error: "El usuario no existe"});
                return res.json(user);
    })
    .patch(async (req, res)=>{
        const user = await User.findByIdAndUpdate(req.params.id, {password: "Cambiada"});
            return res.json({status: "Exitoso"});
    })
    .delete(async (req, res)=>{
        const user = await User.findByIdAndDelete(req.params.id);
            return res.json({status: "Exitoso"});
    });

    Router.post("/", async(req, res) => {
        const body = req.body;
        if(
            !body || !body.email || !body.password
        ){
            return res.status(400).json({msg: "Tiene que llenar todos los campos..."});
        }
        const result = await User.create({
            email: body.email,
            password: body.password,
        });

        return res.status(201).json({msg: "Exitoso"});
    });

    Router.post('/register', authControllers.register)
    Router.post('/login', authControllers.login)

module.exports = Router