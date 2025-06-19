//BORRE LOS ID´S DEL INPUT DEL INPUT RADIO Y INGRESO DE NUMERO.
//BORRE LOS ID´S DEL INPUT DE CONTRASEÑA Y REPETIR CONTRASEÑA POR QUE ESTABAN REPETIDOS

// AGREGUE CLASS A LOS INPUT´S DEL .DATOSDEUSUARIO. (HTML) Y MODIFIQUE LOS SELECTORES EN EL CSS, 
// LO LLAME DE MANERA DIRECTA (.FORM-DATOS), NO DE SELECTOR A SELECTOR, ANTES LO LLAMABA .FORMULARIO .DATOSDEUSUARIO INPUT.
// AL PARECER LOS EVENTOS DE "SUBMIT" SE ESTAN PISANDO EN LOS DOS ARCHIVOS JS.
// PREGUNTARLE A FELI SI SACAMOS LOS REQUIRED.

// - SOLO 3 DIGITOS NI MAS NI MENOS
// - SOLAMENTE NUMEROS
// - QUE NO SEA 0 NI 000
// - QUE NO TENGA ESPACIOS
// - TIENE QUE SER REQUERIDO UNO DE LOS TRES METODOS DE PAGO.

const formulario = document.querySelector(".formulario");
const inputs = document.querySelectorAll(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad, .metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta");

let radioTarjeta = document.getElementById("radioTarjeta");
let radioCupon = document.getElementById("cuponDePagoRadio");
let radioTransferencia = document.getElementById("transferenciaBancaria");
let metodoDePagoTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta");
let metodoDePagoClaveTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad");
let metodoDePagoPagoFacil = document.getElementById("pagoFacil");
let metodoDePagoRapiPago = document.getElementById("rapiPago");

const expresiones = {
    numeroDeTarjeta: /^\d{16}$/,
    claveTarjeta: /^\d{3}$/
}

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

habilitarTarjeta();
habilitarCuponDePago();
habilitarTransferencia();

function longitudNumeroDeTarjeta() {
    let numeroDeTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").value;
    const longitudValida = expresiones.numeroDeTarjeta.test(numeroDeTarjeta);

    if (longitudValida == true) {
        return numeroDeTarjeta;
    } return false;
}

function numeroDeTarjetaValido() {
    const numeroDeTarjeta = longitudNumeroDeTarjeta();
    let vector = parseInt(numeroDeTarjeta, 10);
    let resultado = 0;

    for (let i = 0; i < numeroDeTarjeta.length - 1; i++) {
        vector = parseInt(numeroDeTarjeta[i], 10);
        resultado += vector;
    }

    let resultadoPar = resultado % 2;
    let ultimoValorDeLaTarjeta = numeroDeTarjeta[15] % 2;

    if (resultadoPar === 0 && ultimoValorDeLaTarjeta === 1) {
        return true;
    } else if (resultadoPar === 1 && ultimoValorDeLaTarjeta === 0) {
        return true;
    } else {
        return false;
    }
}

function validacionNumeroDeTarjeta() {
    if (numeroDeTarjetaValido() == true) {
        metodoDePagoTarjeta.classList.remove("validacion-incorrecta");
        metodoDePagoTarjeta.classList.add("validacion-correcta");
        document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "none";
    } else {
        metodoDePagoTarjeta.classList.add("validacion-incorrecta");
        metodoDePagoTarjeta.classList.remove("validacion-correcta");
        document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "flex";
    };
}

function validacionClaveDeLaTarjeta() {
    const claveErronea = 0;
    const claveDeLaTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").value;
    const esValido = expresiones.claveTarjeta.test(claveDeLaTarjeta);

    if (esValido == true && claveDeLaTarjeta != claveErronea) {
        metodoDePagoClaveTarjeta.classList.remove("validacion-incorrecta");
        metodoDePagoClaveTarjeta.classList.add("validacion-correcta");
        document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "none";
    } else {
        metodoDePagoClaveTarjeta.classList.add("validacion-incorrecta");
        metodoDePagoClaveTarjeta.classList.remove("validacion-correcta");
        document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "flex";
    };
}

function validacionIncorrectaInputs() {
    inputs.forEach((input) => {
        input.addEventListener("keyup", function () {
            validacionClaveDeLaTarjeta();
            validacionNumeroDeTarjeta();
        });
    });
}

function validacion() {
    inputs.forEach((input) => {
        input.addEventListener("blur", function () {
            validacionClaveDeLaTarjeta();
            validacionNumeroDeTarjeta();
            metodoDePagoClaveTarjeta.classList.remove("validacion-correcta");
            metodoDePagoClaveTarjeta.classList.remove("validacion-incorrecta");
            metodoDePagoTarjeta.classList.remove("validacion-correcta");
            metodoDePagoTarjeta.classList.remove("validacion-incorrecta");
            document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "none";
            document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "none";
        });
    });
}

validacionIncorrectaInputs();
validacion();