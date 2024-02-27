const jwt = require('jsonwebtoken');

const generarJWTEstudiante = (uid = '', carne = '', grado = '') =>{
    return new Promise((resolve, reject) =>{
        const payload = {uid, carne, grado};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '10h',
            },
            (err,token)=>{
                err ? (console.log(err),reject('No se puede generar el token del estudiante')): resolve(token);
            }
        );
    });
};

const generarJWTProfesor = (uid = '', carne = '', area = '') =>{
    return new Promise((resolve, reject) =>{
        const payload = {uid, carne, area};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '10h',
            },
            (err, token)=>{
                err ? (console.log(err),reject('No se puede generar el token del profesor')): resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWTEstudiante,
    generarJWTProfesor
}