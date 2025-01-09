const {Router} = require("express");
const { loginUsuario, registerUsuario } = require("../controllers/authController");
const { check } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const authRouter = Router();

/** 
* @swagger
* components:
*  schemas:
*   Usuario:
*     type: object
*     properties:
*       username:
*         type: string
*         description: Este es el nombre de usuario
*       email:
*         type: string
*         description: Este es el correo electronico         
*       password:
*         type: string
*         description: Este es la contraseña encriptada con BCrypt, necesita mínimo ser de 6 caracteres
*     required:
*       - username
*       - email
*       - password
*     example:
*       username: Katriel Diaz
*       email: katrieldiaz@gmail.com
*       password: 123456
*/

/** 
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Registra un nuevo usuario
 *    tags: [Usuario]
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json: 
 *          schema: 
 *            type: object
 *            $ref: '#/components/schemas/Usuario'
 *    responses:
 *      501:
 *        description: Correo ya resgistrado
 *      200:
 *        description: Usuario creado y correctamente y retornado con JWT(Token)
*/

authRouter.post("/register", 
    [ check("email", "El formato es invalido").isEmail(), 
      check("password", "la contraseña tiene que ser de 6 carácteres como mínimo").isLength({min: 6}),
      check("username", "El nombre de usuario es requerido").not().isEmpty(),
      validationErrors
    ],
    registerUsuario);

/** 
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Iniciar sesion de un usuario con un token valido
 *    tags: [Usuario]
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json: 
 *          schema: 
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Este es el correo electronico 
 *              password:
 *                type: string
 *                description: Contraseña de 6 caracteres via JWT
 *            required:
 *              - email
 *              - password
 *            example:
 *              email: katrieldiaz@gmail.com
 *              password: 123456
 *    responses:
 *      401:
 *        description: Correo o contraseña invalida
 *      200:
 *        description: Inicio sesion
*/


authRouter.post("/login", 
    [ check("email", "El formato es invalido").isEmail(), 
      check("password", "la contraseña tiene que ser de 6 carácteres como mínimo").isLength({min: 6},
      validationErrors  
    )    
    ],
    loginUsuario);

module.exports = authRouter;