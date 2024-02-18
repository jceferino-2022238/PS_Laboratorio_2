const { request, response } = require("express");
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const bycryptjs = require('bcryptjs');
const { generarJWTEstudiante } = require('../helpers/generar-jwt');
const { generarJWTProfesor } = require('../helpers/generar-jwt') 
const Role = require('../models/role');

const login = async (req = request, res = response) =>{
    const { correo, password, role } = req.body;
    if (role == 'STUDENT_ROL') {
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
            if(role == estudiante.role){
                return res.status(400).json({
                    msg: "El rol ingresado no coincide con el rol de las credenciales."
                });
            }
            const token = await generarJWTEstudiante(estudiante.id);
    
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
    } else if(role == 'TEACHER_ROLE'){
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
            const token = await generarJWTProfesor(profesor.id);
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
    }else{
        return res.status(400).json({
            msg: "El rol enviado no coincide con el rol de las credenciales enviadas"
        });
    }
}

module.exports = {
    login
}
