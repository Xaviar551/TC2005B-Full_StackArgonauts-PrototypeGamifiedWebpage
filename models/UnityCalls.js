import mysql from "mysql";

//Conection with the DB
var conection = mysql.createConnection({
    host: "localhost",
    database: "cemexevidencia",
    user: "root",
    password: "",
});

conection.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log("Successful conection");
    }
});

export default class UnityCallsModel {
    constructor() {
        this.mysqConnection = conection;
    }

    gSpecial_Event(params) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT ID_evento, ID_usuario, fecha FROM EventosEspeciales WHERE ID_evento=?",
                [params.id_evento],
                function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    resolve(res);
                }
            );
        });
    }

    pSpecial_Event(params) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO EventosSpeciales VALUES(?, ?, ?)",
                [params.id_evento, params.id_usuario, params.fecha],
                function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    resolve(res);
                }
            );
        });
    }
    User_Points(params) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT points FROM Gamer WHERE ID_gamer=?",
                [params.ID_gamer],
                function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    resolve(res);
                }
            );
        });
    }

    gMars_Building(params) {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT posicionX, posicionY, posicionZ FROM mapaPosicion WHERE ID_construccion=?",
                [params.ID_construccion],
                function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    resolve(res);
                }
            );
        });
    }

    pMars_Building(params) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO mapaPosicion VALUES(?, ?, ?, ?, ?), INSERT INTO construcciones VALUES(?, ?)",
                [
                    params.ID_gamer,
                    params.ID_construccion,
                    params.posicionX,
                    params.posicionY,
                    params.posicionZ,
                    params.ID_construccion,
                    params.nombre,
                ],
                function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    resolve(res);
                }
            );
        });
    }

    User_History() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM {NOMBRE DE TABLA}",
                [],
                function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    resolve(res);
                }
            );
        });
    }
}
