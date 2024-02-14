const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const { response, request, query } = require('express');

const profesoresGet = async (req, res = response) => {
    const { limite, desde } = req.body;
    const query = { estado: true };

    const [total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        profesores
    });
}

const getProfesorById = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        profesor
    });
}

const profesoresPost = async (req, res) => {
    const { nombre, carne, areaTecnica, correo, password, role } = req.body;
    const profesor = new Profesor({ nombre, carne, areaTecnica, correo, password, role });

    if(password){
        const salt = bcryptjs.genSaltSync();
        profesor.password = bcryptjs.hashSync(password, salt);
    }

    await profesor.save();
    res.status(202).json({
        profesor
    });
}

module.exports = {
    profesoresGet,
    getProfesorById,
    profesoresPost
}

