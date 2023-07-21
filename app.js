const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const NodeCache = require("node-cache");

const CLIENT_ID = "AeDBfqCHS2kuTjLSiFmkbrzVL8qm7ibeGvDD7JWyDJqGmwtuC5D-PnXGobAeD-bYQo_RwcO3lSBpwF2r";
const APP_SECRET = "EAD089fc5pfy3Hab9WdFO5OJCdofETIOSnq4VnC-EkHZAqmsh1hhknke7v6dWm9sfG_NmPQRyYhPo8ti";
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};

const app = express();
const myCache = new NodeCache();

// allow json body
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/login.html"));
});

app.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/perfil.html"));
});

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/packs", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/packs.html"));
});

app.get("/cuidadores", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/cuidadores.html"));
});

app.get("/payment", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/payment.html"));
});

app.get("/pasarela", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/pasarela.html"));
});

//Llamados post por backend

// INICIA PAYPAL
// create a new order
app.post("/create-paypal-order", async (req, res) => {
    const order = await createOrder();
    console.log(1);
    res.json(order);
});

// capture payment & store order information or fullfill order
app.post("/capture-paypal-order", async (req, res) => {
    const { orderID } = req.body;
    const captureData = await capturePayment(orderID);
    // TODO: store payment information such as the transaction ID
    console.log(2);
    res.json(captureData);
});

async function createOrder() {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "10.00",
                    },
                },
            ],
        }),
    });
    const data = await response.json();
    return data;
}

// use the orders api to capture payment for an order
async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}

// generate an access token using client id and app secret
async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64")
    const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}
// FIN PAYPAL

app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/estilos'));
app.use(express.static(__dirname + '/scripts'));

app.listen(3000, () => {
    console.log("El servidor se ejecuta en el puerto :", 3000);
});