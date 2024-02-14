const { request, response } = require("express");
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const bycryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const loginEstudiante = async (req = request, res = response) =>{
    const { correo, password } = req.body;

    try{
        const estudiante = await Estudiante.findOne({correo});

        if(!estudiante){
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos."
            });
        }
        if(!estudiante.estado){
            return res.status(400).json({
                msg: "El estudiante no existe en la base de datos."
            })
        }
        const validarPassword = bycryptjs.compareSync(password, estudiante.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }
        const token = await generarJWT(estudiante.id);

        res.status(200).json({
            msg: "Bienvenido al sistema, ingresó como estudiante",
            estudiante,
            token
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el admin"
        });
    };
};

const loginProfesor = async (req = request, res = response) =>{
    const { correo, password} = req.body;
    try {
        const profesor = await Profesor.findOne({correo});

        if(!profesor){
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos."
            })
        }
        if(!profesor.estado){
            return res.status(400).json({
                msg: "El profesor no existe en la base de datos."
            })
        }
        const validarPassword = bycryptjs.compareSync(password, profesor.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
        }
        const token = await generarJWT(profesor.id);
        res.status(200).json({
            msg: "Bienvenido al sistema, ingresó como profesor",
            profesor,
            token
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el admin"
        });
    };
}

module.exports = {
    loginEstudiante,
    loginProfesor
}
