const {Router} = require("express");
const { createTarea, readTarea, updateTarea, deleteTarea } = require("../controllers/tareaController");
const verifyToken = require("../middlewares/verifyToken");
const { check } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const router = Router();

router.get("/read", [ verifyToken], readTarea);

router.post("/create", [
    check("nombre", "Nombre del Proyecto obligatorio").not().isEmpty(),
    validationErrors,
    verifyToken
    ],
    createTarea);



router.put("/update/:id", [
    check("nombre", "Nombre del Proyecto obligatorio").not().isEmpty(),
    validationErrors,
    verifyToken],
    updateTarea);

router.delete("/delete/:id", [verifyToken], deleteTarea);

module.exports = router;