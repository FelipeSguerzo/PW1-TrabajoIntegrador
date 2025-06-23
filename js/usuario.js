 const nombreUsuarioElement = document.querySelector("#nombreUsuario");
const emailElement = document.querySelector("#email");

 const getUsuarios = () => {
     const usuarios = localStorage.getItem("usuarios");
     return usuarios ? JSON.parse(usuarios) : [];
 };

 const getUsuarioSesionIniciada = () => {
     const usuario = localStorage.getItem("usuarioSesionIniciada");
     return usuario ? JSON.parse(usuario) : null;
 };

 document.addEventListener("DOMContentLoaded", () => {
     const usuarioActual = getUsuarioSesionIniciada();
     if (usuarioActual) {
         nombreUsuarioElement.textContent = usuarioActual.username;
         emailElement.textContent = usuarioActual.correo;
     } else {
         window.location.href = "index.html"; 
     }
 });