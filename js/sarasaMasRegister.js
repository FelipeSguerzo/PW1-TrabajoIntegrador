// REVISAR CON CUPONES DE PAGO COMO HACER PARA QUE LO GUARDE EN EL LOCALSTORAGE

const nodoContrasenia = document.querySelector("#contrasenia")
const nodoRepetirContrasenia = document.querySelector("#repetirContrasenia")
const nodoUsername = document.querySelector("#nombreDeUsuario")
const nodoNumeroTarjeta = document.querySelector("#tarjetaDeDebitoOCredito")
const buttonConfirm = document.querySelector("#confirm");
const form = document.querySelector("form");
const mensajeContrasenia = document.querySelector(".mensaje-contrasenia");
const mensajeRepetir = document.querySelector(".mensaje-repetir")
const mensajeUsername = document.querySelector(".mensaje-usuario")
const email = document.querySelector("#email");

const formulario = document.querySelector(".formulario");
const inputs = document.querySelectorAll(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad, .metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta");

const radioTarjeta = document.getElementById("radioTarjeta");
const radioCupon = document.getElementById("cuponDePagoRadio");
const radioTransferencia = document.getElementById("transferenciaBancaria");
const metodoDePagoTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta");
const metodoDePagoClaveTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad");
const metodoDePagoPagoFacil = document.getElementById("pagoFacil");
const metodoDePagoRapiPago = document.getElementById("rapiPago");
const mensajeDeErrorNumeroInvalido = document.querySelector(".numeroDeTarjeta-incorrecto");
const mensajeDeErrorClaveInvalida = document.querySelector(".codigoDeSeguridad-incorrecto");
const mensajeDeErrorCupon = document.querySelector(".cupon-incorrecto");
const mensajeFormularioInvalido = document.querySelector(".formulario-invalido");

const expresiones = {
    numeroDeTarjeta: /^\d{16}$/,
    claveTarjeta: /^\d{3}$/
}

console.log("a");

const getUsuarios = () => {
    const usuarios = localStorage.getItem("usuarios");
    return usuarios ? JSON.parse(usuarios) : [];
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    mensajeRepetir.textContent = "";
    mensajeContrasenia.textContent = "";
    const usuario = nodoUsername.value;
    const contrasenia = nodoContrasenia.value
    const contraseniaRepetida = nodoRepetirContrasenia.value;
    const correo = email.value;
    const numeroDeTarjetaDelUsuario = metodoDePagoTarjeta.value
    const claveDeTarjetaDelUsuario = metodoDePagoClaveTarjeta.value;

    if (!verificarContrasenia(contrasenia)) {
        mensajeContrasenia.textContent = "La contraseña debe tener al menos 2 letras, 2 numeros y 2 caracteres especiales";
        mensajeContrasenia.style.color = "red";
        return
    }

    if (contrasenia !== contraseniaRepetida) {
        mensajeRepetir.textContent = "Las contraseñas deben ser iguales";
        mensajeRepetir.style.color = "red";
        return
    }

    if (crearUsuario(usuario, contrasenia,correo) && (radioTransferencia.checked == true || cuponDePago() == true || ((numeroDeTarjetaValido(numeroDeTarjetaDelUsuario) == true) && validacionClaveDeLaTarjeta(claveDeTarjetaDelUsuario) == true))) {
        form.submit();
    }
})

function crearUsuario(username, contrasenia, correo) {
    const usuarios = getUsuarios();
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username) {
            mensajeUsername.textContent = "Ya hay un usuario registrado con este nombre. Pruebe otro"
            mensajeUsername.style.color = "red";
            return false;
        }
    }

    usuarios.push({ username, contrasenia, correo });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("La cuenta se ha creado con exito");
    return true;
}


function verificarContrasenia(contrasenia) {
    const letras = contrasenia.match(/[a-zA-Z]/g) || [];
    const numeros = contrasenia.match(/[0-9]/g) || [];
    const caracteresEspeciales = contrasenia.match(/[!"#$%&/]/g) || [];

    return letras.length >= 2 && numeros.length >= 2 && caracteresEspeciales.length >= 2;
}


function eliminarUsuario(username) {
    const usuarios = getUsuarios();
    const usuariosANoEliminar = []
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username !== username) {
            usuariosANoEliminar.push(usuarios[i]);
        }
    }

    localStorage.setItem("usuarios", JSON.stringify(usuariosANoEliminar));
}



//INPUTS DE LOS METODOS DE PAGO DESACTIVADOS.

function habilitarTarjeta() {
    radioTarjeta.addEventListener("change", function () {
        if (this.checked) {
            metodoDePagoTarjeta.disabled = false;
            metodoDePagoClaveTarjeta.disabled = false;
            metodoDePagoPagoFacil.disabled = true;
            metodoDePagoRapiPago.disabled = true;
            metodoDePagoPagoFacil.checked = false;
            metodoDePagoRapiPago.checked = false;
        }
    });
}

function habilitarCuponDePago() {
    radioCupon.addEventListener("change", function () {
        if (this.checked) {
            metodoDePagoPagoFacil.disabled = false;
            metodoDePagoRapiPago.disabled = false;
            metodoDePagoTarjeta.disabled = true;
            metodoDePagoClaveTarjeta.disabled = true;
            metodoDePagoTarjeta.value = "";
            metodoDePagoClaveTarjeta.value = "";
        }
    });
}

function habilitarTransferencia() {
    radioTransferencia.addEventListener("change", function () {
        if (this.checked) {
            metodoDePagoPagoFacil.disabled = true;
            metodoDePagoRapiPago.disabled = true;
            metodoDePagoTarjeta.disabled = true;
            metodoDePagoClaveTarjeta.disabled = true;
            metodoDePagoTarjeta.value = "";
            metodoDePagoClaveTarjeta.value = "";
            metodoDePagoPagoFacil.checked = false;
            metodoDePagoRapiPago.checked = false;
        }
    })
}

//INPUTS DE LOS METODOS DE PAGO DESACTIVADOS.

function numeroDeTarjetaValido(numeroDeTarjetaIngresada) {
    const longitudValida = expresiones.numeroDeTarjeta.test(numeroDeTarjetaIngresada);
    const numeroDeTarjeta = numeroDeTarjetaIngresada;
    let vector = parseInt(numeroDeTarjeta, 10);
    let resultado = 0;
    let resultadoPar;
    let ultimoValorDeLaTarjeta;
    let tarjetaValida = false;

    if (longitudValida == true) {
        for (let i = 0; i < numeroDeTarjeta.length - 1; i++) {
            vector = parseInt(numeroDeTarjeta[i], 10);
            resultado += vector;
        }

        resultadoPar = resultado % 2;
        ultimoValorDeLaTarjeta = numeroDeTarjeta[15] % 2;

        if (resultadoPar === 0 && ultimoValorDeLaTarjeta === 1) {
            tarjetaValida = true;
        } else if (resultadoPar === 1 && ultimoValorDeLaTarjeta === 0) {
            tarjetaValida = true;
        } else {
            tarjetaValida = false;
        }
    }

    return tarjetaValida;
}

function visualizacionNumeroDeTarjeta() {
    metodoDePagoTarjeta.addEventListener("keyup", function () {
        const numero = this.value;

        if (numeroDeTarjetaValido(numero) == false) {
            metodoDePagoTarjeta.classList.add("validacion-incorrecta");
            metodoDePagoTarjeta.classList.remove("validacion-correcta");
            document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "flex";
            mensajeDeErrorNumeroInvalido.textContent = "Tarjeta inválida";
        } else {
            metodoDePagoTarjeta.classList.remove("validacion-incorrecta");
            metodoDePagoTarjeta.classList.add("validacion-correcta");
            document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "none";
        }
    });
}

// VALIDACION NUMERO DE TARJETA

// VALIDACION CLAVE DE LA TARJETA

function validacionClaveDeLaTarjeta(claveIngresada) {
    const claveErronea = 0;
    const esValido = expresiones.claveTarjeta.test(claveIngresada);
    let claveCorrecta = true;

    if (esValido == true && claveIngresada != claveErronea) {
        claveCorrecta = true;
    } else {
        claveCorrecta = false;
    };

    return claveCorrecta;
}

function visualizacionClaveDeLaTarjeta() {
    metodoDePagoClaveTarjeta.addEventListener("keyup", function () {
        const clave = this.value;

        if (validacionClaveDeLaTarjeta(clave) == true) {
            metodoDePagoClaveTarjeta.classList.remove("validacion-incorrecta");
            metodoDePagoClaveTarjeta.classList.add("validacion-correcta");
            document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "none";
        } else {
            metodoDePagoClaveTarjeta.classList.add("validacion-incorrecta");
            metodoDePagoClaveTarjeta.classList.remove("validacion-correcta");
            document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "flex";
            mensajeDeErrorClaveInvalida.textContent = "Clave inválida";
        }
    })
}

// VALIDACION CLAVE DE LA TARJETA

// VALIDACION CUPON DE PAGO

function cuponDePago() {
    let checkboxPagoFacil = document.getElementById("pagoFacil");
    let checkboxRapiPago = document.getElementById("rapiPago");

    return (checkboxPagoFacil.checked || checkboxRapiPago.checked);
}

function visualizacionCuponDePago() {
    let checkboxPagoFacil = document.getElementById("pagoFacil");
    let checkboxRapiPago = document.getElementById("rapiPago");
    const checkBoxes = document.querySelectorAll(".metodoDePago__cuponDePago");

    checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (checkboxPagoFacil.checked === true || checkboxRapiPago.checked === true) {
                document.querySelector(".cupon-incorrecto").style.display = "none";
            } else {
                document.querySelector(".cupon-incorrecto").style.display = "flex";
                mensajeDeErrorCupon.textContent = "Seleccione al menos un cupón de pago";
            }
        });
    });

    radioTarjeta.addEventListener("change", function () {
        if (radioTarjeta.checked === true) {
            document.querySelector(".cupon-incorrecto").style.display = "none";
        }
    });

    radioTransferencia.addEventListener("change", function () {
        if (radioTransferencia.checked === true) {
            document.querySelector(".cupon-incorrecto").style.display = "none";
        }
    });
}

// VALIDACION CUPON DE PAGO

function validacion() {
    inputs.forEach((input) => {
        input.addEventListener("blur", function () {
            validacionClaveDeLaTarjeta();
            numeroDeTarjetaValido();
            metodoDePagoClaveTarjeta.classList.remove("validacion-correcta");
            metodoDePagoClaveTarjeta.classList.remove("validacion-incorrecta");
            metodoDePagoTarjeta.classList.remove("validacion-correcta");
            metodoDePagoTarjeta.classList.remove("validacion-incorrecta");
            document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "none";
            document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "none";
        });
    });
}

cuponDePago();
visualizacionCuponDePago();
visualizacionNumeroDeTarjeta();
visualizacionClaveDeLaTarjeta();
validacion();
habilitarTarjeta();
habilitarCuponDePago();
habilitarTransferencia();