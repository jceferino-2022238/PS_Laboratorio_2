const {Schema, model, default: mongoose} = require('mongoose');

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
    correo:{
        type: String,
        required: [true, 'El correo del sistema es obligatorio'],
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
    },
    cursos:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        validate: [arrayLimite, 'No pueden haber más de 3 cursos asignados'],
        ref: "cursosEstudiantes"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

function arrayLimite(val) {
    return val.length <= 3;
}

EstudianteSchema.methods.toJSON = function(){
    const{__v, password, _id, ...estudiante} = this.toObject();
    estudiante.uid = _id;
    return estudiante;
};  

module.exports = model('Estudiante', EstudianteSchema);
