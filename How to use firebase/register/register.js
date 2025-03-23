const inpUsername = document.querySelector(".inp-username");
const inpEmail = document.querySelector(".inp-email");
const inpPassword = document.querySelector(".inp-password");
const inpConfirmPassword = document.querySelector(".inp-cf-password");
const registerForm = document.querySelector("#register-form");

function handleRegister(event) {
    event.preventDefault();

    let username = inpUsername.value;
    let email = inpEmail.value;
    let password = inpPassword.value;
    let confirmPassword = inpConfirmPassword.value;

    if (password != confirmPassword) {
        alert("Password is not match")
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            alert("Sign up sucessfully!!!");
            window.location.href = "../index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`Error: ${error.message}`);
        });
}

registerForm.addEventListener("submit", handleRegister);