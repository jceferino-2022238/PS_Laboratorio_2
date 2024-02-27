const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const { response, request, query } = require('express');
const Curso = require('../models/curso');
const profesoresGet = async (req, res = response) => {
  const { limite, desde } = req.body;
  const query = { estado: true };

  const [total, profesores] = await Promise.all([
    Profesor.countDocuments(query),
    Profesor.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    profesores,
  });
};

const getProfesorById = async (req, res) => {
  const { id } = req.params;
  const profesor = await Profesor.findOne({ _id: id });

  res.status(200).json({
    profesor,
  });
};

const profesoresPost = async (req, res) => {
  const { nombre, carne, areaTecnica, correo, password } = req.body;
  const profesor = new Profesor({
    nombre,
    carne,
    areaTecnica,
    correo,
    password
  });

  if (password) {
    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);
  }

  await profesor.save();
  res.status(202).json({
    profesor,
  });
};

const asignarCursosP = async (req, res = response) => {
  const { id } = req.params;
  const { cursos, ...resto } = req.body;
  try {
    const cursosP = await Curso.find({ _id: { $in: cursos } });
    if (cursosP.length !== cursos.length) {
      return res.status(400).json({ error: 'No se encontraron los cursos' });
    }
    const profesor = await Profesor.findByIdAndUpdate(id, { ...resto, cursos });
    res.status(200).json({
      msg: 'Se añadieron los cursos',
      profesor,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({error: 'No se asignaron los cursos'})
  }
};

const visualizarCursosP = async (req, res = response) => {
  const { id } = req.params;
  const profesor = await Profesor.findOne({ _id: id });
  const cursos = profesor.cursos;
  const cursosP = await Curso.find({ _id: { $in: cursos } });
  const nombresCursos = cursosP.map(curso => curso.nombre)
  res.status(200).json({
    msg: `Los cursos del profesor son los siguientes: ${nombresCursos.join(', ')}`,
  });
};
module.exports = {
  profesoresGet,
  getProfesorById,
  profesoresPost,
  asignarCursosP,
  visualizarCursosP,
};
