const mongoose = require("mongoose");

const conexionDB = async () => {

    try {

        await mongoose.connect(
            process.env.DB_Connection
    );
    
    console.log("Conectado a DB")

    } catch (error) {
        console.log("Error al conectar")
    }

    
};

module.exports = conexionDB;