const {Router} = require("express");
const { createTarea, readTarea, updateTarea, deleteTarea } = require("../controllers/tareaController");
const verifyToken = require("../middlewares/verifyToken");
const { check } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const router = Router();

router.post("/create", [
    check("nombre", "Nombre del Proyecto obligatorio").not().isEmpty(),
    validationErrors,
    verifyToken
    ],
    createTarea);

router.get("/read", [ verifyToken], readTarea);

router.put("/update/:id", [
    check("nombre", "Nombre del Proyecto obligatorio").not().isEmpty(),
    validationErrors,
    verifyToken],
    updateTarea);

router.delete("/delete/:id", [verifyToken], deleteTarea);

module.exports = router;