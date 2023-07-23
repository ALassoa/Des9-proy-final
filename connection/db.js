const mongoose = require("mongoose")

const mongodbUrl = "mongodb://localhost:27017/woofBD"

const db = async() => {
    try{
        const conn = await mongoose.connect(mongodbUrl, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

        console.log(`MongoDB conectado: ${conn.connection.host}`);
       
    }catch(error){
        console.error(error);
    }
}
module.exports = db