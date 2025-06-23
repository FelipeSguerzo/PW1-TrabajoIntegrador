 const nombreUsuarioElement = document.querySelector("#nombreUsuario");
 const emailElement = document.querySelector("#email");
 const formUsuario = document.querySelector("#formularioUsuario");
 const tarjetaDebitoCreditoRadio = document.querySelector("#tarjetaDeDebitoOCreditoRadio");
 const numeroTarjetaInput = document.querySelector("#tarjetaDeDebitoOCredito");
 const codigoSeguridadInput = document.querySelector("#codigoDeSeguridad");
 const cuponDePagoRadio = document.querySelector("#cuponDePago");
 const pagoFacilCheckbox = document.querySelector("#pagoFacil");
 const rapiPagoCheckbox = document.querySelector("#rapiPago");
 const transferenciaBancariaRadio = document.querySelector("#transferenciaBancaria");
 const botonCancelarSubscripcion = document.querySelector(".acionesFormulario .boton[type='button']");





 const getUsuarios = () => {
     const usuarios = localStorage.getItem("usuarios");
     return usuarios ? JSON.parse(usuarios) : [];
 };

 const getUsuarioSesionIniciada = () => {
     const usuario = localStorage.getItem("usuarioSesionIniciada");
     return usuario ? JSON.parse(usuario) : null;
 };

function cargarMetodoDePago() {
    const usuarioActual = getUsuarioSesionIniciada();
    if (usuarioActual && usuarioActual.metodoDePago) {
        const metodoDePago = usuarioActual.metodoDePago;

        tarjetaDebitoCreditoRadio.checked = false;
        numeroTarjetaInput.value = "";
        codigoSeguridadInput.value = "";
        cuponDePagoRadio.checked = false;
        pagoFacilCheckbox.checked = false;
        rapiPagoCheckbox.checked = false;
        transferenciaBancariaRadio.checked = false;

        if (metodoDePago.tipo === "tarjeta") {
            tarjetaDebitoCreditoRadio.checked = true;
            numeroTarjetaInput.value = metodoDePago.numero || "";
            codigoSeguridadInput.value = metodoDePago.codigo || "";
        } else if (metodoDePago.tipo === "cupon") {
            cuponDePagoRadio.checked = true;
            if (metodoDePago.pagoFacil) {
                pagoFacilCheckbox.checked = true;
            }
            if (metodoDePago.rapiPago) {
                rapiPagoCheckbox.checked = true;
            }
        } else if (metodoDePago.tipo === "transferencia") {
            transferenciaBancariaRadio.checked = true;
        }
    }
}


 document.addEventListener("DOMContentLoaded", () => {
     const usuarioActual = getUsuarioSesionIniciada();
     if (usuarioActual) {
         nombreUsuarioElement.textContent = usuarioActual.username;
         emailElement.textContent = usuarioActual.correo;
         cargarMetodoDePago();
     } else {
         window.location.href = "index.html"; 
     }
 });


 formularioUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    let usuarios = getUsuarios();
    let usuarioActual = getUsuarioSesionIniciada();

    if (!usuarioActual) {
        console.error("No hay usuario en sesión.");
        return;
    }

    let nuevoMetodoDePago = {};

    if (tarjetaDebitoCreditoRadio.checked) {
        nuevoMetodoDePago = {
            tipo: "tarjeta",
            detalles: {
                numeroDeTarjeta: "****************",
                clave: "***"
            }
        };
    } else if (cuponDePagoRadio.checked) {
        nuevoMetodoDePago = {
            tipo: "cupon",
            detalles: {
                pagoFacil: pagoFacilCheckbox.checked,
                rapiPago: rapiPagoCheckbox.checked
            }
        };
    } else if (transferenciaBancariaRadio.checked) {
        nuevoMetodoDePago = {
            tipo: "transferencia",
            detalles: {}
        };
    }

    usuarioActual.metodoDePago = nuevoMetodoDePago;

    const index = usuarios.findIndex(user => user.username === usuarioActual.username);
    if (index !== -1) {
        usuarios[index] = usuarioActual;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioSesionIniciada", JSON.stringify(usuarioActual));
        alert("Cambios guardados ");
    } else {
        console.error("Usuario no encontrado en localStorage al intentar guardar.");
    }
});

botonCancelarSubscripcion.addEventListener("click", (e) => {
    e.preventDefault();

    const usuarioActual = getUsuarioSesionIniciada();
    if (usuarioActual) {
        let usuarios = getUsuarios();
        usuarios = usuarios.filter(user => user.username !== usuarioActual.username);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.removeItem("usuarioSesionIniciada");

        // Mensaje de confirmación directamente, sin el confirm()
        alert("Tu cuenta ha sido eliminada");
        window.location.href = "index.html";
    } else {
        alert("No hay sesión de usuario activa para cancelar la suscripción.");
        window.location.href = "index.html";
    }
});