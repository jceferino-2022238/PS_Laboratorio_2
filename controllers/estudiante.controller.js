const bcryptjs = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const Curso = require('../models/curso');
const { response, request } = require('express');

const estudiantesGet = async (req, res = response) => {
  const { limite, desde } = req.body;
  const query = { estado: true };

  const [total, estudiantes] = await Promise.all([
    Estudiante.countDocuments(query),
    Estudiante.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    estudiantes,
  });
};

const getEstudianteById = async (req, res) => {
  const { id } = req.params;
  const estudiante = await Estudiante.findOne({ _id: id });

  res.status(200).json({
    estudiante,
  });
};

const estudiantesPost = async (req, res) => {
  const { nombre, carne, grado, correo, password, role } = req.body;
  const estudiante = new Estudiante({
    nombre,
    carne,
    grado,
    correo,
    password,
    role,
  });
  if (password) {
    const salt = bcryptjs.genSaltSync();
    estudiante.password = bcryptjs.hashSync(password, salt);
  }
  await estudiante.save();
  res.status(202).json({
    estudiante,
  });
};

const asignarCursosE = async (req, res = response) => {
  const { id } = req.params;
  const { cursos, ...resto } = req.body;
  try {
    const cursosE = await Curso.find({ _id: { $in: cursos } });
    if (cursosE.length !== cursos.length) {
      return res.status(400).json({ error: 'No se encontraron los cursos' });
    }
    const estudiante = await Estudiante.findByIdAndUpdate(id, {
      ...resto,
      cursos,
    });
    res.status(200).json({
      msg: 'Se añadieron los cursos',
      estudiante,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({error: 'No se asignaron los cursos'})
  }
};

const visualizarCursosE = async (req, res = response) => {
  const { id } = req.params;
  const estudiante = await Estudiante.findOne({ _id: id });
  const cursos = estudiante.cursos;
  const cursosE = await Curso.find({ _id: { $in: cursos } });
  const nombresCursos = cursosE.map(curso => curso.nombre)
  res.status(200).json({
    msg: `Los cursos del estudiante son los siguientes: ${nombresCursos.join(', ')}`,
  });
};

module.exports = {
  estudiantesGet,
  getEstudianteById,
  estudiantesPost,
  visualizarCursosE,
  asignarCursosE,
};
