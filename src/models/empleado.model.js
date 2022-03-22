const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    salario: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Empleado = mongoose.model('empleado', EmpSchema);

