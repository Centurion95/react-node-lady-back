const PruebaCtrl = {}
const Empleado = require('../models/empleado.model')

//http://localhost:4000/api
PruebaCtrl.obtener = (req, res) => {
    res.send('funcionando GET')
}


PruebaCtrl.crear = async (req, res) => {
    console.log(req.query)
    // res.send('funcionando POST')
    const { nombre, apellido, salario } = req.body
    console.log(nombre)
    console.log(apellido)
    console.log(salario)
    const NuevoRegistro = new Empleado({ nombre, apellido, salario })
    await NuevoRegistro.save()
    res.json({ mensaje: "Empleado guardado" })
}
PruebaCtrl.actualizar = (req, res) => {
    res.send('funcionando PUT')
}
PruebaCtrl.eliminar = (req, res) => {
    res.send('funcionando DELETE')
}
module.exports = PruebaCtrl