// rc95 21/03/2022 21:30 - https://www.mysqltutorial.org/mysql-nodejs/

const conector = {}

const mysql = require("mysql");
const config = require('./config.js');

conector.ejecutarQuery = (strSql, parametros) => {
    let connection = mysql.createConnection(config);
    connection.query(strSql, parametros, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Rows affected:' + results.affectedRows);
    });
    connection.end();
}


//rc95 21/03/2022 22:52 - NO FUNCIONA!!!! aaaaaaaaaaaaaaaaa
conector.traerResultado = (strSql) => {
    return "no funciona nada";

    let connection = mysql.createConnection(config);
    var resultado_select;
    // let results;
    console.log(strSql);

    connection.query(strSql, (err, results, fields) => {
        if (err) {
            return console.error(error.message);
        }
        console.log("will return");
        res.send(results);
        console.log("returned");
        // resultado_select = results;
        // console.log(results);
        // connection.end();

    });
    connection.end();
    console.log("ended");
    // console.log(resultado_select);
    // return resultado_select;

}

module.exports = conector;