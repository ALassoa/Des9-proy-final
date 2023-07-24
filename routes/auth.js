const express = require('express')
const Router = express.Router()
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser} = require('../controllers/authControllers')

const authControllers = require('../controllers/authControllers')

Router.get("/", async(req, res) =>{
    const html = `<ul> 
                    ${allDbUsers
                    .map((user)=> `<li>${user.email}</li>`)
                    .join("")}
                </ul>`;
                res.send(html);
})

Router.get("/", handleGetAllUsers);

Router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

    Router.post("/", handleCreateNewUser);

    Router.post('/register', authControllers.register)
    Router.post('/login', authControllers.login)

module.exports = Router