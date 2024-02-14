const { Router } = require('express');
const { check } = require('express-validator');
const { profesoresGet, getProfesorById, profesoresPost } = require('../controllers/profesor.controller');
const { existeProfesorById, existenteEmailP, esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.get("/", profesoresGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], getProfesorById);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("carne", "El carne no pue estar vacío").not().isEmpty(),
        check("areaTecnica", "La área técnica no puede estar vacía").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmailP),
        check("role").custom(esRoleValido),
        validarCampos
    ], profesoresPost);

module.exports = router;