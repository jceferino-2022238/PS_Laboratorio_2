const {Schema, model} = require('mongoose');

const ProfesorSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    carne:{
        type: String,
        required: [true, 'El carne es obligatorio']
    },
    area:{
        type: String,
        required: [true, 'El área en el qué se especializa es obligatoria']
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
        enum: ["TEACHER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ProfesorSchema.methods.toJSON = function(){
    const{__v,password, _id, ...profesor} = this.toObject();
    profesor.uid = _id;
    return profesor;
};

module.exports = model('Profesor', ProfesorSchema);
