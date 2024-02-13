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
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el admin"
        });
    };
};

const loginProfesor = async (req = request, res = response) =>{

}

module.exports = {
    loginEstudiante,
    loginProfesor
}
