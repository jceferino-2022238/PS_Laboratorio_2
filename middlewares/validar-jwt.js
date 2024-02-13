const jwt = require('jsonwebtoken');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const {request, response} = require('express');

const validarJWTEstudiante = async(req = request, res = response, next)=>{
    const token = req.header('x-token');
}

const validarJWTProfesor = async(req = request, res = response, next)=>{
    const token = req.header('x-token');
}

module.exports = {
    validarJWTEstudiante,
    validarJWTProfesor
}