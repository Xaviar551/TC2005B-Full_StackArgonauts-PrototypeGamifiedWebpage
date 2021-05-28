import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import EmployeeController from './controller/Employee.js'
import EmployeeModel from './models/Employee.js';
import path from 'path'
const app = express();
const router = express.Router();
const port = 3000;

let init_routes = (app, controllerEmployee) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({extended: true}));
  
  app.use(express.static('public'));
  app.use('/css', express.static(path.resolve('./public/css')));
  app.use('/js', express.static(path.resolve('./public/js')));
  app.use('/img', express.static(path.resolve('./public/img')));
  
  app.set('views', './views');
  app.set('view engine', 'ejs');
  app.get('/', async (req, res) => { 
    let params = Object.assign({},req.params, req.body, req.query)
    let ID_creator_proyect = await controllerEmployee.get_ID_creator_proyect(params);
    let Issue_total = await controllerEmployee.get_Issue_total();
    let Not_closed = await controllerEmployee.get_not_closed();
    console.log(Issue_total);
    res.render('index', {ID_creator_proyect, Issue_total, Not_closed});
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
