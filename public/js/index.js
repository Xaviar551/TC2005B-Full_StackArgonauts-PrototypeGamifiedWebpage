const firebaseConfig = {
  	apiKey: "AIzaSyBCUt492raID9lhXunVhqspS3t3mFKBnNQ",
	authDomain: "cemex-fdbff.firebaseapp.com",
	databaseURL: "https://cemex-fdbff-default-rtdb.firebaseio.com",
	projectId: "cemex-fdbff",
	storageBucket: "cemex-fdbff.appspot.com",
	messagingSenderId: "42476834812",
	appId: "1:42476834812:web:a1f32d1e8d476d182d6c79",
	measurementId: "G-0GFLWD6K65"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const account = document.querySelector(".log");
const box_account = document.querySelector(".box-setting");
const logout = document.querySelector(".Logout");
var Display = true;

auth.onAuthStateChanged(user => {
	if(user){
		account.innerHTML = '<button onClick="Desplegar()"><img src="img/User_Box.png" class="User"></button>'
		document.querySelector("button").style.padding = "5px 5px";
	} else {
		account.innerHTML = '<a href="login"><button>Login</button></a>'
	}
});

logout.addEventListener('click', e =>{
	e.preventDefault();
	auth.signOut().then(() => {
		box_account.style.visibility = "hidden";
	});
});

function Desplegar() {
	if(Display){
		box_account.style.visibility = "visible";
		Display = false;
	} else {
		box_account.style.visibility = "hidden";
		Display = true;
	}
}

//Examples to create a chart
//------------------------ Pie chart --------------------------
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day'],
		['Work',     11],
		['Eat',      2],
		['Commute',  2],
		['Watch TV', 2],
		['Sleep',    7]]);
	var options = {
		title: 'My Daily Activities'
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}

//------------------- Histogram -------------------------------
google.charts.load("current", {'packages': ["corechart"]});
google.charts.setOnLoadCallback(drawHist);
function drawHist() {
	var data = google.visualization.arrayToDataTable([
		['Quarks', 'Leptons', 'Gauge Bosons', 'Scalar Bosons'],
		[2/3, -1, 0, 0],
		[2/3, -1, 0, null],
		[2/3, -1, 0, null],
		[-1/3, 0, 1, null],
		[-1/3, 0, -1, null],
		[-1/3, 0, null, null],
		[-1/3, 0, null, null]
	]);
	
	var options = {
		title: 'Charges of subatomic particles',
		legend: { position: 'top', maxLines: 2 },
		colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
		interpolateNulls: false,
	};
	
	var visualization = new google.visualization.Histogram(document.getElementById('Histogram'));
	visualization.draw(data, options);
}


/*------------------------- Line chart ------------------------- */
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawLine);

function drawLine() {
	var data = google.visualization.arrayToDataTable([
		['Year', 'Sales', 'Expenses'],
		['2004',  1000,      400],
		['2005',  1170,      460],
		['2006',  660,       1120],
		['2007',  1030,      540]
	]);

	var options = {
		title: 'Company Performance',
		legend: { position: 'bottom' }
	};

	var chart = new google.visualization.LineChart(document.getElementById('Line-chart'));
	chart.draw(data, options);
}


//--------------- Datos en tiempo real -----------------
function initialize() {
	var opts = {sendMethod: 'auto'};
	var query = new google.visualization.Query('http://localhost/phpmyadmin/index.php?route=/database/structure&server=1&db=prueba', opts);
	query.setQuery('SELECT edad, sum(Hijos) FROM empleados_datos GROUP BY edad')
	query.send(handleQueryResponse);
}
function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	  	return;
	}
  
	var data = response.getDataTable();
	var chart = new google.visualization.PieChart(document.getElementById('realtime'));
	chart.draw(data, {width: 400, height: 240, is3D: true});
}
