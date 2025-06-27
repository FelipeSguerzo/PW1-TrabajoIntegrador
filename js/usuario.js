const nombreUsuarioElement = document.getElementById("nombreUsuario");
const emailElement = document.getElementById("email");
const formUsuario = document.getElementById("formularioUsuario");
const tarjetaDebitoCreditoRadio = document.getElementById("tarjetaDeDebitoOCreditoRadio");
const numeroTarjetaInput = document.getElementById("tarjetaDeDebitoOCredito");
const codigoSeguridadInput = document.getElementById("codigoDeSeguridad");
const cuponDePagoRadio = document.getElementById("cuponDePago");
const pagoFacilCheckbox = document.getElementById("pagoFacil");
const rapiPagoCheckbox = document.getElementById("rapiPago");
const transferenciaBancariaRadio = document.getElementById("transferenciaBancaria");
const botonCancelarSubscripcion = document.querySelector(".accionesFormulario .boton[type='button']");

// const radioTarjeta = document.getElementById("radioTarjeta");
// const radioCupon = document.getElementById("cuponDePagoRadio");
// const radioTransferencia = document.getElementById("transferenciaBancaria");
// const metodoDePagoTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta");
// const metodoDePagoClaveTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad");

const nuevaContraseñaInput = document.getElementById("nuevaContraseña");
const repiteContraseñaInput = document.getElementById("repiteContraseña");
const mensajeContrasenaError = document.querySelector(".mensaje-contrasenia");
const mensajeRepetirError = document.querySelector(".mensaje-repetir");
const botonGuardarCambios = document.querySelector(".accionesFormulario input[type='submit']");


const mensajeNumeroTarjetaError = document.querySelector(".numeroDeTarjeta-incorrecto");
const mensajeCodigoSeguridadError = document.querySelector(".codigoDeSeguridad-incorrecto");

const linkCerrarSesion = document.querySelector("li.cerrarSesion a");

const expresiones = {
    numeroDeTarjeta: /^\d{16}$/,
    claveTarjeta: /^\d{3}$/    //REVISAR LA COMA SEGURO FALLA POR ESO
};

function validarNumeroDeTarjeta(numeroTarjetaIngresada) {
    const longitudValida = expresiones.numeroDeTarjeta.test(numeroTarjetaIngresada);
    if (!longitudValida) {
        mensajeNumeroTarjetaError.textContent = "El número de tarjeta debe tener 16 numeros.";
        mensajeNumeroTarjetaError.style.display = "block";
        return false;
    }

    let sumaDigitos = 0;
    for (let i = 0; i < numeroTarjetaIngresada.length - 1; i++) {
        sumaDigitos += parseInt(numeroTarjetaIngresada[i], 10);
    }

    const ultimoDigito = parseInt(numeroTarjetaIngresada[numeroTarjetaIngresada.length - 1], 10);
    const sumaParidad = sumaDigitos % 2;
    const ultimoDigitoParidad = ultimoDigito % 2;

    const tarjetaValidaPorAlgoritmo = (sumaParidad === 0 && ultimoDigitoParidad === 1) ||
        (sumaParidad === 1 && ultimoDigitoParidad === 0);

    if (!tarjetaValidaPorAlgoritmo) {
        mensajeNumeroTarjetaError.textContent = "Número de tarjeta inválido.";
        mensajeNumeroTarjetaError.style.display = "block";
        return false;
    }

    mensajeNumeroTarjetaError.textContent = "";
    mensajeNumeroTarjetaError.style.display = "none";
    return true;
}

function validarCodigoDeSeguridad(claveIngresada) {
    const claveErronea = 0;
    const esValido = expresiones.claveTarjeta.test(claveIngresada);

    if (!esValido || claveIngresada === claveErronea) {
        mensajeCodigoSeguridadError.textContent = "La clave debe tener 3 numeros distintos de 0";
        mensajeCodigoSeguridadError.style.display = "block";
        return false;
    }

    mensajeCodigoSeguridadError.textContent = "";
    mensajeCodigoSeguridadError.style.display = "none";
    return true;
}

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
            numeroTarjetaInput.value = metodoDePago.detalles.numeroDeTarjeta || "";
            codigoSeguridadInput.value = metodoDePago.detalles.clave || "";
            pagoFacilCheckbox.disabled = true;
            rapiPagoCheckbox.disabled = true;
            numeroTarjetaInput.disabled = false;
            codigoSeguridadInput.disabled = false;
        } else if (metodoDePago.tipo === "cupon") {
            cuponDePagoRadio.checked = true;
            if (metodoDePago.detalles && metodoDePago.detalles.pagoFacil) {
                pagoFacilCheckbox.checked = true;
                rapiPagoCheckbox.disabled = false;
            }
            if (metodoDePago.detalles && metodoDePago.detalles.rapiPago) {
                rapiPagoCheckbox.checked = true;
                pagoFacilCheckbox.disabled = false;
            }
        } else if (metodoDePago.tipo === "transferencia") {
            transferenciaBancariaRadio.checked = true;
        }
    }
}

function validarNuevaContrasena() {
    const contrasenia = nuevaContraseñaInput.value;
    const contraseniaTotal = contrasenia.length >= 8;
    const letras = (contrasenia.match(/[a-zA-Z]/g) || []).length >= 2;
    const numeros = (contrasenia.match(/[0-9]/g) || []).length >= 2;
    const caracteresEspeciales = (contrasenia.match(/[!"#$%&/]/g) || []).length >= 2;

    if (!contraseniaTotal) {
        mensajeContrasenaError.textContent = "Mínimo 8 caracteres.";
        return false;
    }
    if (!letras) {
        mensajeContrasenaError.textContent = "Mínimo 2 letras.";
        return false;
    }
    if (!numeros) {
        mensajeContrasenaError.textContent = "Mínimo 2 números.";
        return false;
    }
    if (!caracteresEspeciales) {
        mensajeContrasenaError.textContent = "Mínimo 2 caracteres especiales.";
        return false;
    }

    mensajeContrasenaError.textContent = "";
    return true;
}

function validarRepetirContrasena() {
    const contrasenia = nuevaContraseñaInput.value;
    const repiteContrasena = repiteContraseñaInput.value;

    if (contrasenia !== repiteContrasena) {
        mensajeRepetirError.textContent = "Las contraseñas no coinciden.";
        return false;
    }
    mensajeRepetirError.textContent = "";
    return true;
}

function validarMetodoDePagoSeleccionado() {
    if (tarjetaDebitoCreditoRadio.checked) {
        const numeroValido = validarNumeroDeTarjeta(numeroTarjetaInput.value);
        const codigoValido = validarCodigoDeSeguridad(codigoSeguridadInput.value);

        if (numeroValido && codigoValido) {
            pagoFacilCheckbox.checked = false;
            rapiPagoCheckbox.checked = false;
            pagoFacilCheckbox.disabled = true;
            rapiPagoCheckbox.disabled = true;
            numeroTarjetaInput.disabled = false;
            codigoSeguridadInput.disabled = false;
            return true;
        } else {
            numeroTarjetaInput.disabled = false;
            codigoSeguridadInput.disabled = false;
            pagoFacilCheckbox.checked = false;
            rapiPagoCheckbox.checked = false;
            pagoFacilCheckbox.disabled = true;
            rapiPagoCheckbox.disabled = true;
            return false;
        }

    } else if (cuponDePagoRadio.checked) {
        pagoFacilCheckbox.disabled = false;
        rapiPagoCheckbox.disabled = false;
        numeroTarjetaInput.disabled = true;
        codigoSeguridadInput.disabled = true;
        if (pagoFacilCheckbox.checked || rapiPagoCheckbox.checked) {
            return true;
        } else {
            return false;
        }
    } else if (transferenciaBancariaRadio.checked) {
        numeroTarjetaInput.disabled = true;
        codigoSeguridadInput.disabled = true;
        pagoFacilCheckbox.checked = false;
        rapiPagoCheckbox.checked = false;
        pagoFacilCheckbox.disabled = true;
        rapiPagoCheckbox.disabled = true;
        return true;
    }
    return false;
}

function actualizarEstadoBotonGuardar() {
    const contrasenasValidas = (nuevaContraseñaInput.value === "" && repiteContraseñaInput.value === "") || (validarNuevaContrasena() && validarRepetirContrasena());
    const metodoDePagoValido = validarMetodoDePagoSeleccionado();

    if (contrasenasValidas || metodoDePagoValido) {
        botonGuardarCambios.disabled = false;
    } else {
        botonGuardarCambios.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioActual = getUsuarioSesionIniciada();
    if (usuarioActual) {
        nombreUsuarioElement.textContent = usuarioActual.username;
        emailElement.textContent = usuarioActual.correo;
        cargarMetodoDePago();
        botonGuardarCambios.disabled = true;
    } else {
        window.location.href = "index.html";
    }
});

nuevaContraseñaInput.addEventListener("input", actualizarEstadoBotonGuardar);
repiteContraseñaInput.addEventListener("input", actualizarEstadoBotonGuardar);

tarjetaDebitoCreditoRadio.addEventListener("change", () => {
    actualizarEstadoBotonGuardar();
    mensajeNumeroTarjetaError.style.display = "none";
    mensajeCodigoSeguridadError.style.display = "none";
});

numeroTarjetaInput.addEventListener("input", actualizarEstadoBotonGuardar);
codigoSeguridadInput.addEventListener("input", actualizarEstadoBotonGuardar);

cuponDePagoRadio.addEventListener("change", () => {
    actualizarEstadoBotonGuardar();
    mensajeNumeroTarjetaError.style.display = "none";
    mensajeCodigoSeguridadError.style.display = "none";
});

pagoFacilCheckbox.addEventListener("change", () => {
    if (pagoFacilCheckbox.checked) {
        rapiPagoCheckbox.checked = false;
    }
    actualizarEstadoBotonGuardar();
});

rapiPagoCheckbox.addEventListener("change", () => {
    if (rapiPagoCheckbox.checked) {
        pagoFacilCheckbox.checked = false;
    }
    actualizarEstadoBotonGuardar();
});
transferenciaBancariaRadio.addEventListener("change", () => {
    actualizarEstadoBotonGuardar();
    mensajeNumeroTarjetaError.style.display = "none";
    mensajeCodigoSeguridadError.style.display = "none";
});


formularioUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    let usuarios = getUsuarios();
    let usuarioActual = getUsuarioSesionIniciada();

    if (!usuarioActual) {
        console.error("No hay usuario en sesión.");
        return;
    }

    if (nuevaContraseñaInput.value !== "" || repiteContraseñaInput.value !== "") {
        if (!validarNuevaContrasena() || !validarRepetirContrasena()) {
            alert("Corrige los errores en las contraseñas.");
            return;
        }
        usuarioActual.contrasenia = nuevaContraseñaInput.value;
    }

    if (!validarMetodoDePagoSeleccionado()) {
        alert("Selecciona un metodo de pago y sus detalles");
        return;
    }

    let nuevoMetodoDePago = {};

    if (tarjetaDebitoCreditoRadio.checked) {
        nuevoMetodoDePago = {
            tipo: "tarjeta",
            detalles: {
                numeroDeTarjeta: numeroTarjetaInput.value,
                clave: codigoSeguridadInput.value
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
        nuevaContraseñaInput.value = "";
        repiteContraseñaInput.value = "";
        actualizarEstadoBotonGuardar();
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
        alert("Tu cuenta ha sido eliminada");
        window.location.href = "index.html";
    } else {
        window.location.href = "index.html";
    }
});

if (linkCerrarSesion) {
    linkCerrarSesion.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioSesionIniciada");
        window.location.href = "index.html";
    });
}

// function habilitarTarjeta() {
//     radioTarjeta.addEventListener("change", function () {
//         if (this.checked) {
//             metodoDePagoTarjeta.disabled = false;
//             metodoDePagoClaveTarjeta.disabled = false;
//             metodoDePagoPagoFacil.disabled = true;
//             metodoDePagoRapiPago.disabled = true;
//             metodoDePagoPagoFacil.checked = false;
//             metodoDePagoRapiPago.checked = false;
//         }
//     });
// }

// function habilitarCuponDePago() {
//     radioCupon.addEventListener("change", function () {
//         if (this.checked) {
//             metodoDePagoPagoFacil.disabled = false;
//             metodoDePagoRapiPago.disabled = false;
//             metodoDePagoTarjeta.disabled = true;
//             metodoDePagoClaveTarjeta.disabled = true;
//             metodoDePagoTarjeta.value = "";
//             metodoDePagoClaveTarjeta.value = "";
//         }
//     });
// }

// function habilitarTransferencia() {
//     radioTransferencia.addEventListener("change", function () {
//         if (this.checked) {
//             metodoDePagoPagoFacil.disabled = true;
//             metodoDePagoRapiPago.disabled = true;
//             metodoDePagoTarjeta.disabled = true;
//             metodoDePagoClaveTarjeta.disabled = true;
//             metodoDePagoTarjeta.value = "";
//             metodoDePagoClaveTarjeta.value = "";
//             metodoDePagoPagoFacil.checked = false;
//             metodoDePagoRapiPago.checked = false;
//         }
//     })
// }

// habilitarTarjeta();
// habilitarCuponDePago();
// habilitarTransferencia();