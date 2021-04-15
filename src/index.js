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
		account.innerHTML = '<button onClick="Desplegar()"><img src="/img/User_Box.png" class="User"></button>'
		document.querySelector("button").style.padding = "5px 5px";
	} else {
		account.innerHTML = '<a href="login.html"><button>Login</button></a>'
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