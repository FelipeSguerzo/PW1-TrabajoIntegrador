const botonIniciarSesion = document.querySelector("button.login");
const inputUsername = document.querySelector("#usuario");
const inputPassword = document.querySelector("#password");

function validarInputs(){
    if(inputPassword.value === "" || inputUsername.value === ""){
        botonIniciarSesion.setAttribute("disabled","true");
    } else {
        botonIniciarSesion.removeAttribute("disabled");
    }
}

inputUsername.addEventListener("input",validarInputs)
inputPassword.addEventListener("input",validarInputs)

validarInputs();