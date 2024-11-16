const {Router} = require("express");
const { loginUsuario, registerUsuario } = require("../controllers/authController");
const { check } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const authRouter = Router();

authRouter.post("/register", 
    [ check("email", "El formato es invalido").isEmail(), 
      check("password", "la contraseña tiene que ser de 6 carácteres como mínimo").isLength({min: 6}),
      check("username", "El nombre de usuario es requerido").not().isEmpty(),
      validationErrors
    ],
    registerUsuario);
authRouter.post("/login", 
    [ check("email", "El formato es invalido").isEmail(), 
      check("password", "la contraseña tiene que ser de 6 carácteres como mínimo").isLength({min: 6},
      validationErrors  
    )    
    ],
    loginUsuario);

module.exports = authRouter;