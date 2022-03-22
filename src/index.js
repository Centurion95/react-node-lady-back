//para ejecutar.. npm run dev  (que configuramos en el package.json, para que corra el nodemon)
const express = require('express')
const app = express()

//rc95 19/03/2022 10:33 - lo de aqui adentro es para mySql
const cors = require('cors')
app.use(cors({ origin: "*" }))
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
//npm install mysql
const mysql = require("mysql");
// const config = require('./config.js');
const conector = require('./conector_sql.js');

//const db = mysql.createPool({
let db = mysql.createConnection({

    connectionLimit: 5,

    // desarrollo
    host: "localhost",
    user: "root",
    password: "admin",

    // produccion - no anda todavia..
    // host: "34.83.225.234:3306",
    // user: "root",
    // password: "..",

    database: "react_node_mysql",
});


http://localhost:4000/
app.get("/", (req, res) => {
    console.log("--> /");

    const strSql = "insert into TIPO_DOCUMENTO(NOMBRE) values('test_from_/');";
    conector.ejecutarQuery(strSql, []);
    res.send("hello from /");
});

http://localhost:4000/api/get
app.get("/api/get", (req, res) => {
    console.log("--> /api/get");

    const strSql = "select * from EMPLEADOS where FECHA_ELIMINADO is null;";
    db.query(strSql, (err, result) => {
        //console.log(result);
        if (err) {
            console.log(err);
        }

        res.send(result);
    });

    /*
    //rc95 21/03/2022 22:52 - NO FUNCIONA!!!! aaaaaaaaaaaaaaaaa
    let resultados = conector.traerResultado(strSql);
    console.log(resultados);
    res.send(resultados);
    // res.send(conector.traerResultado(strSql));
    */
});

http://localhost:4000/api/insert
app.post("/api/insert", (req, res) => {
    console.log("--> /api/insert");

    const { nombre, apellido, salario } = req.body

    const strSql = "insert into EMPLEADOS(NOMBRE, APELLIDO, SALARIO) values(?,?,?);";
    conector.ejecutarQuery(strSql, [nombre, apellido, salario]);
});

http://localhost:4000/api/delete
app.put("/api/delete", (req, res) => {
    console.log("--> /api/delete");

    const ID = req.body.ID;

    const strSql = "update EMPLEADOS set FECHA_ELIMINADO = now() where ID = ?;";
    conector.ejecutarQuery(strSql, [ID]);
});

//........................................................

const morgan = require('morgan')
// const cors = require('cors')
// const bodyparser = require('body-parser')
const PruebaCtrl = require('./controllers/prueba.controllers');
const { restart } = require('nodemon');

// require('./database')//para conectarnos a la BD (database.js) (mongoDB)

app.set('Port', 4000)

app.use(morgan('dev'))
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use(bodyparser.json())

// rc95 21/02/2022 22:11 - para no estar reiniciando cada rato la consola.. aplicamos el siguient cambio en el package.json:
// "dev": "nodemon src/index.js"

// app.use(cors({ origin: "*" }))

//rc95 21/02/2022 22:34 - RUTAS
app.use('/api/', require('./routes/prueba.routes'))


//probar en navegador:
// http://localhost:4000/api

//inicializamos nuestro server..
app.listen(app.get('Port'), () => {
    console.log('running on port: ', app.get('Port'))

    console.log(new Date().toLocaleString(), ' >>> Inicio de la creación de estructura')

    let strSql_crear_estructura;
    strSql_crear_estructura = `
    CREATE TABLE IF NOT EXISTS TIPO_TICKET (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NOMBRE VARCHAR(50) NOT NULL,
        FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,
        FECHA_ELIMINADO DATETIME NULL
    );`
    conector.ejecutarQuery(strSql_crear_estructura, []);


    strSql_crear_estructura = `
    CREATE TABLE IF NOT EXISTS TIPO_DOCUMENTO (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NOMBRE VARCHAR(50) NOT NULL,
        FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,
        FECHA_ELIMINADO DATETIME NULL
    );`
    conector.ejecutarQuery(strSql_crear_estructura, []);

    //rc95 21/03/2022 23-13
    strSql_crear_estructura = `
    CREATE TABLE IF NOT EXISTS EMPLEADOS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        NOMBRE VARCHAR(50) NOT NULL,
        APELLIDO VARCHAR(50) NOT NULL,
        SALARIO INT NOT NULL,
        FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,
        FECHA_ELIMINADO DATETIME NULL
    );`
    conector.ejecutarQuery(strSql_crear_estructura, []);

    console.log(new Date().toLocaleString(), ' >>> Finalizó la creación de estructura..')
});
