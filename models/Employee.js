const mysql = require('mysql');
//Conection with the DB
var conection = mysql.createConnection({
	host: 'localhost',
	database: 'prueba',
	user: 'root',
	password: ''
});

conection.connect((error) => {
	if(error){
		throw error;
	} else {
		console.log("Successful conection");
	}
});

res = conection.query('SELECT * FROM `empleados_datos`', function (error, res, fileds) {
	if(error){
		throw error;
	}
	res.forEach(res => {
		console.log(res)
	});
});

export default class EmployeeModel {
  constructor() {
    this.mysqConnection = conection;
  }
  fetch(params){
    // santize
    let query = ""
    for(attr in params){
      query += attr+","
    }
    query.slice(0, -1)
    return new Promise((resolve, reject) =>{
      // add where to query and pass params
      conection.query('SELECT '+query+' FROM `empleados_datos` ', function (error, res, fileds) {
        if(error){
          reject(error);
        }
        // TODO res should have in json format the employee data
        resolve({employees: res})
      });
    });
  }
}
