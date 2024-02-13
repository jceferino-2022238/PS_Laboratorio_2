const {response} = require("express");

const esEstudianteRole = (req, res, next) =>{
    if(!req.estudiante){
        return res.status(500).json({
            msg: "Se desea validar un estudiante sin validar token primero"
        });
    }

    const {role,nombre} = req.estudiante;

    if(role !== "STUDENT_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es un estudiante, no se puede usar este endpoint`
        });
    };
    next();
}
const esProfesorRole = (req, res, next) =>{
    if(!req.profesor){
        return res.status(500).json({
            msg: "Se desea validar un profesor sin validar token primero"
        });
    }

    const {role,nombre} = req.profesor;

    if(role !== "TEACHER_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es un profesor, no se puede usar este endpoint`
        });
    };
    next(); 
}

module.exports = {
    esEstudianteRole,
    esProfesorRole
}