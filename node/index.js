const express = require('express');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "pfa-mysql",
    user: "root",
    password: "root",
    database: "pfa",
});

conn.connect((err) => {
    if (err) {
        console.error("MySQL Connection Error: ", err);
        return;
    }

    console.log("MySQL Connection Successful");
});

const app = express();

app.get("/", (_, res) => {
    var sqlSelect = `SELECT * FROM cursos`;

    conn.query(sqlSelect, (err, results) => {
        if (err) {
            console.error(err);
            res.json({
                success: false,
                message: "An error occurred",
            });
            return;
        }
        console.log(results);

        var tabela = '';

        results.forEach((row) => {
            tabela += '<tr><td>'+ row.nome_do_curso + '</td></tr>';
        })

        // for(var i = 0; i < result.length; i++){
        //     tabela +='<tr><td>' + result[i].name +'</td></tr>';
        // }

        res.send(
            '<style> \
                table, th, td {border: 1px solid black;} \
            </style> \
            <h1>Nome dos módulos do curso FullCycle</h1> \
            <table> \
                <tr> \
                    <th> Nome do módulo </th> \
                </tr>'
                    + tabela +
            '</table>'
        );
    });
});

app.listen(3000, () => {
    console.log("Express listen on 3000");
});