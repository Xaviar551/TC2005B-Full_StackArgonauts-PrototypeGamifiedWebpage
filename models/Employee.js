import mysql from 'mysql'

//Conection with the DB
var conection = mysql.createConnection({
	host: 'localhost',
	database: 'cemexevidencia',
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


export default class EmployeeModel {
  constructor() {
    this.mysqConnection = conection;
  }
  Get_User(email){
    // santize
    /* let query = ""
    for(attr in params){
      query += attr+","
    }
    query.slice(0, -1) */
    return new Promise((resolve, reject) =>{
      // add where to query and pass params
      //SELECT edad,SUM(Hijos) as Hijos_total FROM `empleados_datos` GROUP BY edad,Hijos
      conection.query('SELECT ID_user as id, _password as password, email FROM cemexuser WHERE email=?',[email], function (error, res, fileds) {
        if(error){
          reject(error);
        }
        // TODO res should have in json format the employee data
        resolve(res)
      });
    });
  };
  ID_creator_proyect(params){
    // santize
    /* let query = ""
    for(attr in params){
      query += attr+","
    }
    query.slice(0, -1) */
    return new Promise((resolve, reject) =>{
      // add where to query and pass params
      //SELECT edad,SUM(Hijos) as Hijos_total FROM `empleados_datos` GROUP BY edad,Hijos
      conection.query('SELECT id_creator, count(i.issue_key) AS \'Number_projects\' FROM Issue i GROUP BY id_creator', function (error, res, fileds) {
        if(error){
          reject(error);
        }
        // TODO res should have in json format the employee data
        resolve({employees: res})
      });
    });
  };
  Issue_status(){
    return new Promise((resolve, reject) => {
      conection.query('SELECT issue_status, COUNT(issue_status) as Total FROM issue GROUP BY issue_status', (error,res,fileds) => {
        if(error) reject(error);
        resolve({Estatus_total: res});
      });
    });
  };
  not_closed(){
    return new Promise((resolve, reject) => {
      conection.query('SELECT i.issue_status,COUNT(i.issue_status) as Total FROM Issue i WHERE i.issue_status NOT IN (\'Closed\') GROUP BY issue_status', (error,res,fileds) => {
        if(error) reject(error);
        resolve({Not_closed_total: res});
      });
    });
  };
}