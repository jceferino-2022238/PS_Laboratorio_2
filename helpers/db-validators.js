const Role = require('../models/role');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const Curso = require('../models/curso')
const existenteEmailE = async (correo= '') =>{
    const existeEmail = await Estudiante.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}
const mayorA3 = async(id = '') =>{
    const estudiante = await Estudiante.findOne({_id: id});
    const cursos = estudiante.cursos
    if(cursos.length >= 3){
        throw new Error('Este estudiante ya cuenta con el máximo de cursos asignables');
    }
}
const cursoNombre = async(nombre = '') =>{
    const existeCurso = await Curso.findOne({nombre});
    if(existeCurso){
        throw new Error(`El curso ${nombre} ya está registrado`);
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
const existeCursoById = async (id = '') =>{
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El curso con el ${id} no existe`);
    }
}
module.exports = {
    existeEstudianteById,
    existeProfesorById,
    esRoleValido,
    existenteEmailE,
    existenteEmailP,
    cursoNombre,
    existeCursoById,
    mayorA3,
}