const Role = require('../models/role');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');

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
    existeProfesorById
}