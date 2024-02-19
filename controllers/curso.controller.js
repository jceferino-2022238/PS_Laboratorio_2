const Curso = require('../models/curso');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const { response } = require('express')

const cursosGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursoById = async (req, res) =>{
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});
    
    res.status(200).json({
        curso
    });
}

const putCursos = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...resto} = req.body;

    await Curso.findByIdAndUpdate(id, resto);
    
    const curso = await Curso.findOne({id});

    res.status(200).json({
        msg: 'Curso actualizado exitosamente',
        curso
    });
}

const cursosDelete = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estado: false});

    await Estudiante.updateMany({ cursos: id }, { $pull: { cursos: id } });
    res.status(200).json({
        msg: "Curso a eliminar",
        curso
    });
}

const cursosPost = async (req, res) =>{
    const {nombre, descripcion, jornada} = req.body;
    const curso = new Curso({nombre, descripcion, jornada});

    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursosGet,
    getCursoById,
    putCursos,
    cursosDelete,
    cursosPost
}