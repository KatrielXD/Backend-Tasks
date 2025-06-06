const mongoose = require("mongoose");

const conexionDB = async () => {

    try {

        await mongoose.connect(
            process.env.DB_CONNECTION
    );
    
    console.log("Conectado a DB")

    } catch (error) {
        console.log("Error al conectar", error)
        
    }

    
};

module.exports = conexionDB;