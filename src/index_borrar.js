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

// const db = mysql.createPool({
//     // desarrollo
//     // host: "localhost",
//     // user: "root",
//     // password: "admin",

//     // produccion
//     host: "34.83.225.234:3306",
//     user: "root",
//     password: "1995AzuOvelar",

//     database: "react_node_mysql",
// });

//https://cloud.google.com/sql/docs/mysql/samples/cloud-sql-mysql-mysql-create-tcp?hl=es-419
const db = mysql.createPool({
    // produccion
    user: "root",
    password: "1995AzuOvelar",
    database: "react_node_mysql",
    host: "34.83.225.234",
    port: "3306",
    // ... Specify additional properties here.
    // ...config,
});
//OJOOOOOOOOOOOOOOOOOOOOOOOO
//rc95 19/03/2022 22:19- seguir desde aqui.:
// https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/HEAD/cloud-sql/mysql/mysql/server.js
// https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/HEAD/cloud-sql/mysql/mysql/server.js


//https://cloud.google.com/sql/docs/mysql/samples/cloud-sql-mysql-mysql-create-tcp?hl=es-419
const createTcpPool = async config => {
    // Extract host and port from socket address
    const dbSocketAddr = process.env.DB_HOST.split(':');

    // Establish a connection to the database
    return mysql.createPool({
        user: "root",
        password: "1995AzuOvelar",
        database: "react_node_mysql",
        host: "34.83.225.234",
        port: "3306",
        // ... Specify additional properties here.
        ...config,
    });
};

http://localhost:4000/
app.get("/", (req, res) => {
    // console.log("--> /");

    // const strSql = "insert into TIPO_DOCUMENTO(NOMBRE) values('test_from_/');";
    // db.query(strSql, (err, result) => {
    //     if (err) console.log(err);
    // });
    // res.send("hello from /");

    //https://cloud.google.com/sql/docs/mysql/samples/cloud-sql-mysql-mysql-connection?hl=es-419
    try {
        const stmt = "insert into TIPO_DOCUMENTO(NOMBRE) values('test_from_/');";
        // Pool.query automatically checks out, uses, and releases a connection
        // back into the pool, ensuring it is always returned successfully.
        /*await*/ Pool.query(stmt/*, [timestamp, team]*/);
        res.send("ok insert");
    } catch (err) {
        // If something goes wrong, handle the error in this section. This might
        // involve retrying or adjusting parameters depending on the situation.
        // ...
        res.send("error: " + err);
    }

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
});

http://localhost:4000/api/insert
app.post("/api/insert", (req, res) => {
    console.log("--> /api/insert");

    const { nombre, apellido, salario } = req.body

    const strSql = "insert into EMPLEADOS(NOMBRE, APELLIDO, SALARIO) values(?,?,?);";
    db.query(strSql, [nombre, apellido, salario], (err, result) => {
        console.log(result);
    });
});

http://localhost:4000/api/delete
app.put("/api/delete", (req, res) => {
    console.log("--> /api/delete");

    const ID = req.body.ID;

    const strSql = "update EMPLEADOS set FECHA_ELIMINADO = now() where ID = ?;";
    db.query(strSql, [ID], (err, result) => {
        console.log(result);
    });
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
})