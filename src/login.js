var x = document.querySelector("#Login");
var y = document.querySelector("#Register");
var z = document.querySelector("#buttons");
const signup = document.querySelector('#Register');
const signin = document.querySelector("#Login");
const Fail = document.querySelectorAll(".Failure");
const faceButton = document.querySelector("#facebook");
const googleButton = document.querySelector("#google");


function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
    signin.reset();
    Fail[0].innerText ="";
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
    signup.reset();
    Fail[1].innerText = "";

}

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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* Create the account */
signup.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;
    if(email.substring(email.search("@"), 14) === "@CEMEX.com"){
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                signup.reset();
                window.location.href = "/public/index.html";
            })
            .catch(error => {
                console.log(error);
                if(error.code === "auth/email-already-in-use"){
                    Fail[0].innerText = "The email already in use"
                }
            })
    } else {
        Fail[0].innerText = "El correo no es empresarial";
    }
});

/* Sign in into the account */
signin.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector("#signinEmail").value;
    const password = document.querySelector("#signinPassword").value;
    if(email.substring(email.search("@"), 14) === "@CEMEX.com"){
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                signin.reset();
                window.location.href = "/public/index.html";
            })
            .catch(error => {
                if(error.code === "auth/wrong-password"){
                    Fail[1].innerText = "Email or password are incorrect"
                }
                else if(error.code === "auth/user-not-found"){
                    Fail[1].innerText = "Account doesn't exist";
                }
            });
    } else {
        Fail[1].innerText = "El correo no es empresarial";
    }
});

googleButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
        if(result.user.email.substring(result.user.email.search("@"), 14) === "@CEMEX.com"){
            window.location.href = "/public/index.html";
        } else {
            Fail[0].innerText = "El correo no es de la empresa CEMEX";
            Fail[1].innerText = "El correo no es de la empresa CEMEX";
        }
    })
    .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            var pendingCred = error.credential;
            var email = error.email;
            auth.fetchSignInMethodsForEmail(email).then(function(methods) {
                if (methods[0] === 'password') {
                    var password = prompt("Contraseña utilizada para creación de cuenta", ""); 
                    auth.signInWithEmailAndPassword(email, password).then(function(result) {
                        return result.user.linkWithCredential(pendingCred);
                    }).then(function() {
                        window.location.href = "/public/index.html";
                    });
                    return;
                }
                var provider = getProviderForProviderId(methods[0]);
                auth.signInWithPopup(provider).then(function(result) {
                    result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                        window.location.href = "/public/index.html";
                    });
                });
            });
        }
    });
});

faceButton.addEventListener('click', e => {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            if(result.user.email.substring(result.user.email.search("@"), 14) === "@CEMEX.com"){
                window.location.href = "/public/index.html";
            } else {
                Fail[0].innerText = "El correo no es de la empresa CEMEX";
                Fail[1].innerText = "El correo no es de la empresa CEMEX";
            }
        })
        .catch(error => {
            if (error.code === 'auth/account-exists-with-different-credential') {
                var pendingCred = error.credential;
                var email = error.email;
                auth.fetchSignInMethodsForEmail(email).then(function(methods) {
                    if (methods[0] === 'password') {
                        var password = prompt("Contraseña utilizada para creación de cuenta", ""); 
                        auth.signInWithEmailAndPassword(email, password).then(function(result) {
                            return result.user.linkWithCredential(pendingCred);
                        }).then(function() {
                            window.location.href = "/public/index.html";
                        });
                        return;
                    }
                    var provider = getProviderForProviderId(methods[0]);
                    auth.signInWithPopup(provider).then(function(result) {
                        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                            window.location.href = "/public/index.html";
                        });
                    });
                });
            }
        });
});