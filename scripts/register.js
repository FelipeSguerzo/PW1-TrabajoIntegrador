const nodoContrasenia = document.querySelector("#contrasenia")
const nodoRepetirContrasenia = document.querySelector("#repetirContrasenia")
const nodoUsername = document.querySelector("#nombreDeUsuario")
const nodoNumeroTarjeta = document.querySelector("#tarjetaDeDebitoOCredito")
const buttonConfirm = document.querySelector("#confirm");
const form = document.querySelector("form");
const mensajeContrasenia = document.querySelector(".mensaje-contrasenia");
const mensajeRepetir = document.querySelector(".mensaje-repetir")
const mensajeUsername = document.querySelector(".mensaje-usuario")

console.log("a");


const getUsuarios = ()=> {
const usuarios = localStorage.getItem("usuarios");
return usuarios ? JSON.parse(usuarios) : [];
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    mensajeRepetir.textContent = "";
    mensajeContrasenia.textContent = "";
    const usuario = nodoUsername.value;
    const contrasenia = nodoContrasenia.value 
    const contraseniaRepetida = nodoRepetirContrasenia.value;
    if(!verificarContrasenia(contrasenia)){
        mensajeContrasenia.textContent = "La contraseña debe tener al menos 2 letras, 2 numeros y 2 caracteres especiales";
        mensajeContrasenia.style.color = "red";
        return
    }

    if(contrasenia !== contraseniaRepetida){
        mensajeRepetir.textContent = "Las contraseñas deben ser iguales";
        mensajeRepetir.style.color = "red";
        return
    }


   if(crearUsuario(usuario,contrasenia)){
    form.submit();
}
})

function crearUsuario(username,contrasenia){
    const usuarios = getUsuarios();
    for(let i=0;i<usuarios.length;i++){
        if(usuarios[i].username === username){
            mensajeUsername.textContent = "Ya hay un usuario registrado con este nombre. Pruebe otro"
            mensajeUsername.style.color = "red";
            return false;
        } 
    }

    usuarios.push({username,contrasenia});
            localStorage.setItem("usuarios",JSON.stringify(usuarios));
            console.log("La cuenta se ha creado con exito");
            return true;
}


function verificarContrasenia(contrasenia) {
const letras = contrasenia.match(/[a-zA-Z]/g) || [];
const numeros = contrasenia.match(/[0-9]/g) || [];
const caracteresEspeciales = contrasenia.match(/[!"#$%&/]/g) || [];

return letras.length>=2 && numeros.length>=2 && caracteresEspeciales.length>=2;
}


