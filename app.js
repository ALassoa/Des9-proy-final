const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const NodeCache = require( "node-cache" ); 

const app = express();
const myCache = new NodeCache();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/index.html")); 
});

app.get("/perfil",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/perfil.html")); 
});

app.get("/index",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/index.html")); 
});

app.get("/packs",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/packs.html")); 
});

app.get("/cuidadores",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/cuidadores.html")); 
});

app.get("/payment",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/payment.html")); 
});

//Llamados post por backend
app.post("/payment",(req,res)=>{
    res.sendFile(path.join(__dirname + "/views/payment.html")); 
});


app.use(express.static(__dirname + '/img')); 
app.use(express.static(__dirname + '/estilos')); 
app.use(express.static(__dirname + '/scripts'));

app.listen(3000,()=>{
    console.log("El servidor se ejecuta en el puerto :", 3000); 
});