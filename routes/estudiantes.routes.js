const { Router } = require('express');
const { check } = require('express-validator');
const { estudiantesGet, getEstudianteById, estudiantesPost, asignarCursosE, visualizarCursosE, putEstudiante, estudiantesDelete } = require('../controllers/estudiante.controller');
const { existeEstudianteById, existenteEmailE, mayorA3} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWTEstudiante } = require('../middlewares/validar-jwt');
const { esEstudianteRole } = require('../middlewares/validar-roles');
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
        validarCampos,
    ], estudiantesPost);

router.put(
    "/putEstudiantes/:id",
    [
        validarJWTEstudiante,
        esEstudianteRole,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], putEstudiante);

router.delete(
    "/:id",
    [
        validarJWTEstudiante,
        esEstudianteRole,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], estudiantesDelete);

router.put(
    "/asignarCursosE/:id",
    [
        validarJWTEstudiante,
        esEstudianteRole,
        check('id').custom(mayorA3),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], asignarCursosE);

router.get(
    "/visualizarCursosE/:id",
    [
        validarJWTEstudiante,
        esEstudianteRole,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], visualizarCursosE);

module.exports = router;