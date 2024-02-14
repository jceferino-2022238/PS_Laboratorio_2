const Role = require('../models/role');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');

const existenteEmailE = async (correo= '') =>{
    const existeEmail = await Estudiante.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}
const existenteEmailP = async (correo= '') =>{
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}
const esRoleValido = async (role = '') =>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

const existeEstudianteById = async (id = '') => {
    const existeEstudiante = await Estudiante.findOne({id});
    if(existeEstudiante){
        throw new Error(`El estudiante con el ${id} no existe`);
    }
}

const existeProfesorById = async (id = '') => {
    const existeProfesor = await Profesor.findOne({id});
    if(existeProfesor){
        throw new Error(`El profesor con el ${id} no existe`);
    }
}

module.exports = {
    existeEstudianteById,
    existeProfesorById,
    esRoleValido,
    existenteEmailE,
    existenteEmailP
}