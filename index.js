const {version} =  require("./package.json")

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const conexionDB = require("./db/conifg");

const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tareas");
const path = require("path");


const app = express();

require("dotenv").config();

conexionDB();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:4200',  // Permite solicitudes de este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions));

app.use( "/", express.static(__dirname + "/public") );
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup( swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "",
            version,
        },
        servers: [
            {
                url: "https://09-rest-mean-five.vercel.app/",
            }
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
    }) 
    )
);

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(process.env.PORT, () => {
    console.log(`aplicacion corriendo en puerto ${process.env.PORT}`);
});