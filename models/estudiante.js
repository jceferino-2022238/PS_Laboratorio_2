const {Schema, model} = require('mongoose');

const EstudianteSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del estudiante es obligatorio']
    },
    carne:{
        type: String,
        required: [true, 'El carne del estudiante es obligatorio']
    },
    grado:{
        type: String,
        required: [true, 'El grado del estudiante es obligatorio']
    },
    usuario:{
        type: String,
        required: [true, 'El usuario del sistema es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña del sistema es obligatoria']
    },
    role:{
        type: String,
        require: true,
        enum: ["STUDENT_ROLE"]
    }
});
