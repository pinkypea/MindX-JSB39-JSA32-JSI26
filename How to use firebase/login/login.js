const inpEmail = document.querySelector(".inp-email");
const inpPassword = document.querySelector(".inp-password");
const loginForm = document.querySelector("#login-form");

function handleLogin(e) {
    e.preventDefault();

    let email = inpEmail.value;
    let password = inpPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert("Login successfully");
            window.location.href = "../index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`Error: ${error.message}`);
        });
}

loginForm.addEventListener("submit", handleLogin);
