const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();
const port = 3000;
const EmployeeController = require('./controller/Employee');
let EmployeeModel = require('./models/Employee.js');


let init_routes = (app, controllerEmployee) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({extended: true}));
  
  app.use(express.static('public'));
  app.use('/css', express.static(__dirname + 'public/css'));
  app.use('/js', express.static(__dirname + 'public/js'));
  app.use('/img', express.static(__dirname + 'public/img'));
  
  app.set('views', './views');
  app.set('view engine', 'ejs');
  app.get('/', async (req, res) => { 
    let params = Object.assing({},req.params, req.body, req.query)
    let employeeData = await controllerEmployee.get(params)
    res.render('index', employeeData); 
  });
  app.get('/About', (req, res) => { res.render('About'); });
  app.get('/Game', (req, res) => {res.render('Game'); });
  app.get('/Login', (req, res) => { res.render('login'); });
  app.use('/', router);
  app.listen(port, () => {console.log(`The server is in: localhost:${port}`)});
}
let employeeModel = new EmployeeModel()
let employeeController = new EmployeeController(employeeModel)
init_routes(app, employeeController)
