const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripción del curso es obligatoria']
    },
    jornada:{
        type: String,
        required: [true, 'La jornada es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

CursoSchema.methods.toJSON = function(){
    const{__v, _id, ...curso} = this.toObject();
    curso.uid = _id;
    return curso;
}

module.exports = model('Curso', CursoSchema);