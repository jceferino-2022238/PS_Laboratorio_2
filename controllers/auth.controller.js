const { request, response } = require("express");
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const bycryptjs = require('bcryptjs');
const { generarJWTEstudiante } = require('../helpers/generar-jwt');
const { generarJWTProfesor } = require('../helpers/generar-jwt') 

const login = async (req = request, res = response) =>{
    const { correo, password} = req.body;
    try {
        let usuario = await Estudiante.findOne({ correo });
        if (!usuario || usuario.role !== 'STUDENT_ROLE'){
            usuario = await Profesor.findOne({ correo })
        }
        if (!usuario) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos."
            });
        }
        
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos."
            });
        }

        const validarPassword = bycryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const role = usuario.role;

        const token = (role === 'STUDENT_ROLE') ? await generarJWTEstudiante(usuario.id) : await generarJWTProfesor(usuario.id);
    
        res.status(200).json({
            msg: `Bienvenido al sistema, ingresó como ${role === 'STUDENT_ROLE' ? 'estudiante' : 'profesor'}`,
            usuario,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el administrador"
        });
    }
};

module.exports = {
    login
}
