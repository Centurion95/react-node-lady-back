const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
const PruebaCtrl = require('./controllers/prueba.controllers')

require('./database')//para conectarnos a la BD (database.js)

app.set('Port', 4000)

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

// rc95 21/02/2022 22:11 - para no estar reiniciando cada rato la consola.. aplicamos el siguient cambio en el package.json:
// "dev": "nodemon src/index.js"

app.use(cors({origin:"*"}))

//rc95 21/02/2022 22:34 - RUTAS
app.use('/api/', require('./routes/prueba.routes'))


//probar en navegador:
// http://localhost:4000/api

//inicializamos nuestro server..
app.listen(app.get('Port'), () => {
    console.log('test desde el puertoooo: ', app.get('Port'))
})