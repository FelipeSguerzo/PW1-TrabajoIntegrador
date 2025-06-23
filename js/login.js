const botonIniciarSesion = document.querySelector("button.login");
const inputUsername = document.querySelector("#usuario");
const inputPassword = document.querySelector("#password");
const form = document.querySelector("form");


function validarInputs(){
    if(inputPassword.value.trim() === "" || inputUsername.value.trim() === ""){
        botonIniciarSesion.setAttribute("disabled","true");
    } else {
        botonIniciarSesion.removeAttribute("disabled");
    }
}

inputUsername.addEventListener("input",validarInputs)
inputPassword.addEventListener("input",validarInputs)

validarInputs();

const getUsuarios = () => {
    const usuarios = localStorage.getItem("usuarios");
    return usuarios ? JSON.parse(usuarios) : [];
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const usernameErrorMessage = document.querySelector(".username-error");
    const passwordErrorMessage = document.querySelector(".password-error");
    usernameErrorMessage.textContent = "";
    passwordErrorMessage.textContent = "";
    
    const username = inputUsername.value;
    const contrasenia = inputPassword.value;
    
    if(!usuarioRegistrado(username)){
        usernameErrorMessage.textContent ="No hay ningun usuario registrado con ese nombre"
        usernameErrorMessage.style.color = "red";
        return
    }

    if(!coincideContraseniaConUsuario(username,contrasenia)){
        passwordErrorMessage.textContent = "La contraseña es incorrecta"
        passwordErrorMessage.style.color = "red";
        return
    }

    const usuario = getUsuarioSesion(username);
    localStorage.setItem("usuarioSesionIniciada",JSON.stringify(usuario));
    form.submit();
})

const getUsuarioSesionIniciada = ()=>{
    const usuario = localStorage.getItem("usuarioSesionIniciada");
    return usuario ? JSON.parse(usuario) : [];
}

function usuarioRegistrado(username){
    const usuarios = getUsuarios();
    let seEncontro = false;
    usuarios.forEach((element)=>{
        if(element.username===username){
            seEncontro = true;
        }
    })

    return seEncontro;
}

function coincideContraseniaConUsuario(username,contrasenia){
    const usuarios = getUsuarios();
    let coinciden = false;
    usuarios.forEach((element)=>{
        if(element.username===username && element.contrasenia === contrasenia){
            coinciden = true;
        }
    })

    return coinciden;
}

function getUsuarioSesion(username) {
  const usuarios = getUsuarios();

  for (const user of usuarios) {
    if (user.username === username) {
      const { username, contrasenia, correo, metodoDePago } = user;
      return { username, contrasenia, correo, metodoDePago };
    }
  }

  return null; 
}

