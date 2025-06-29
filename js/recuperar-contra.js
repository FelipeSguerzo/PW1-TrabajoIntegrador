const usuarioInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const form = document.querySelector(".formlogin");
const botonEnviarEmail = document.querySelector(".btn-send")
const mensajeErrorUsername = document.querySelector(".msg-error__username");
const mensajeErrorEmail =document.querySelector(".msg-error__email");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    mensajeErrorEmail.textContent = "";
    mensajeErrorUsername.textContent = "";
    mensajeErrorEmail.style.color = "red";
    mensajeErrorUsername.style.color = "red";
    const username = usuarioInput.value;
    const email = emailInput.value;
    console.log(username);
    console.log(email);

    if(!seEncontro(username)){
        mensajeErrorUsername.textContent = "El usuario no se encontro";
        return;
    }

    if(!validarDatos(email,username)){
        mensajeErrorEmail.textContent = "Verifica que el nombre usuario este asociado al correo electronico proporcionado";
        return
    }

    form.submit();
})

function validarInputs(){
 if(emailInput.value.trim() === "" || usuarioInput.value.trim() === ""){
        botonEnviarEmail.setAttribute("disabled","true");
    } else {
        botonEnviarEmail.removeAttribute("disabled");
    }
}

validarInputs();

usuarioInput.addEventListener("input",validarInputs);
emailInput.addEventListener("input",validarInputs)



function seEncontro(username){
    let seEncontro = false;
    const usuarios = getUsuarios();
    usuarios.forEach((element)=>{
        if(element.username === username){
            seEncontro = true;
        }
    })
    return seEncontro;
}

function validarDatos(email,username){
    const usuarios = getUsuarios();
    let datosValidos = false;
    usuarios.forEach((element)=>{
        console.log(element.correo,element.username);
    if(element.correo == email && element.username === username){
        datosValidos = true;
    }
    })

    return datosValidos;
}

const getUsuarios = () => {
    const usuarios = localStorage.getItem("usuarios");
    return usuarios ? JSON.parse(usuarios) : [];
}
