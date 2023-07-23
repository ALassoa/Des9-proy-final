const fs = require("fs");

//middleware plugin

function logReqRes(filename){
    return(req, res, next) => { 
        fs.appendFile(
            filename, `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`, (err, data) => {
                next();
            }
        );
    }
}

// users.push({...body, id: users.lenght + 1});
//         fs.writeFile("./randomData.json", JSON.stringify(users), (err, data) =>{
//             return res.json({Estatus: "Existoso", id:users.lenght});
//         });

module.exports = logReqRes;