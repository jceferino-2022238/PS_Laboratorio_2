const { Router } = require('express');
const { check } = require('express-validator');
const { estudiantesGet, getEstudianteById, estudiantesPost } = require('../controllers/estudiante.controller');
const { existeEstudianteById, existenteEmailE, esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
router.get("/", estudiantesGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], getEstudianteById);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("carne", "El carne no pue estar vacío").not().isEmpty(),
        check("grado", "El grado no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmailE),
        check("role").custom(esRoleValido),
        validarCampos,
    ], estudiantesPost);

module.exports = router;