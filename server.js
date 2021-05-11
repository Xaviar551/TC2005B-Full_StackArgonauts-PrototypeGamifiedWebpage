const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const app = express();
const path = require('path');
const router = express.Router();

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

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/About', (req, res) => {
	res.render('About');
});

app.get('/Game', (req, res) => {
	res.render('Game');
});

app.get('/Login', (req, res) => {
	res.render('login');
});

app.use('/', router);
app.listen(3000);