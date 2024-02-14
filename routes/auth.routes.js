const { Router } = require('express');
const { check } = require('express-validator');

const { loginEstudiante } = require('../controllers/auth.controller');
const { loginProfesor } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/loginEstudiante',
    [
        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ], loginEstudiante);

router.post(
    '/loginProfesor',
    [
        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ], loginProfesor);

module.exports = router;