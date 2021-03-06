/*
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
  */
  
  //const auth = firebase.auth();
  const account = document.querySelector(".log");
  const box_account = document.querySelector(".box-setting");
  const logout = document.querySelector(".Logout");
  var Display = true;
  
/*
  //TODO cambiar por 
  auth.onAuthStateChanged(user => {
	  if(user){
		  account.innerHTML = '<button onClick="Desplegar()"><img src="img/User_Box.png" class="User"></button>'
		  document.querySelector("button").style.padding = "5px 5px";
	  } else {
		  account.innerHTML = '<a href="login"><button>Login</button></a>'
	  }
  });
  */
  logout.addEventListener('click', e =>{
	  e.preventDefault();
	  auth.signOut().then(() => {
		  box_account.style.visibility = "hidden";
	  });
  });
 



// --- eventos ----






	function Desplegar() {
	  if(Display){
		  box_account.style.visibility = "visible";
		  Display = false;
	  } else {
		  box_account.style.visibility = "hidden";
		  Display = true;
	  }
	}

	function logout_clicked(){
		window.location.href="/logout";
	}
  
  
  //------------------------ Pie chart --------------------------
  //bar, column, line, area, stepped area, bubble, pie, donut, combo, candlestick, histogram, scatte
  let Pie_drawChart = (employees) => {
	  return () => {
		  let epmloyeeData = [['ID', 'Projects']]
		  employees.forEach(employee => {
			  epmloyeeData.push([employee.id_creator.toString(), employee.Number_projects])
		  });
		  // var data = google.visualization.arrayToDataTable([
		  // 	//{type: 'string', lable: 'Nombre'}, {type: 'number', lable: 'Edad'}],
		  // 	['Nombre', 'Edad'],
		  // 	['erick', 19],
		  // 	['juve', 30]
		  // ]);
		  let data = google.visualization.arrayToDataTable(epmloyeeData)
		  var options = {
			  title: 'Numero de proyectos por ID creador'
		  };
	  
		  // ------ start of google sample
		  // var data = new google.visualization.DataTable();
		  // data.addColumn('string', 'Element');
		  // data.addColumn('number', 'Percentage');
		  // data.addRows([
		  // 	['Nitrogen', 0.78],
		  // 	['Oxygen', 0.21],
		  // 	['Other', 0.01]
		  // ]);
		  // ----- end of google sample
		  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		  chart.draw(data, options);
	  }
  }
  
  let Histogram_drawChart = (employees) => {
	  return () => {
		  let epmloyeeData = [['Estatus', 'Total']]
		  employees.forEach(employee => {
			  epmloyeeData.push([employee.issue_status, employee.Total])
		  });
		  let data = google.visualization.arrayToDataTable(epmloyeeData)
		  var options = {
			  title: 'Total de tareas segun su estatus',
			  legend: {position: 'none'},
		  };
		  var chart = new google.visualization.Histogram(document.getElementById('Histogram'));
		  chart.draw(data, options);
	  }
  }
  
  let Line_drawChart = (employees) => {
	  return () => {
		  let epmloyeeData = [['Estatus', 'Total']]
		  employees.forEach(employee => {
			  epmloyeeData.push([employee.issue_status, employee.Total])
		  });
		  let data = google.visualization.arrayToDataTable(epmloyeeData)
		  var options = {
			  title: 'Numero de tareas NO cerrados',
			  legend: {position: 'none'},
		  };
		  var chart = new google.visualization.LineChart(document.getElementById('Line-chart'));
		  chart.draw(data, options);
	  }
  }