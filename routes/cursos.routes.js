const { Router } = require('express');
const { check } = require('express-validator');
const { cursosGet, getCursoById, putCursos, cursosDelete, cursosPost } = require('../controllers/curso.controller');
const { existeCursoById, cursoNombre } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get("/", cursosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], getCursoById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], putCursos);

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], cursosDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre del curso no puede estar vacío").not().isEmpty(),
        check("nombre").custom(cursoNombre),
        check("jornada", "La jornada no puede estar vacía").not().isEmpty(),
        check("descripcion", "La descripcion del curso no puede estar vacía").not().isEmpty(),
        validarCampos
    ], cursosPost);

module.exports = router;