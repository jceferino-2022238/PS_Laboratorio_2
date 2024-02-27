const {Schema, model, default: mongoose} = require('mongoose');

const ProfesorSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    carne:{
        type: String,
        required: [true, 'El carne es obligatorio']
    },
    areaTecnica:{
        type: String,
        required: [true, 'El área en el qué se especializa es obligatoria']
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
        default: "TEACHER_ROLE"
    },
    cursos:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "cursosEstudiantes"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ProfesorSchema.methods.toJSON = function(){
    const{__v, password, _id, ...profesor} = this.toObject();
    profesor.uid = _id;
    return profesor;
};

module.exports = model('Profesor', ProfesorSchema);
