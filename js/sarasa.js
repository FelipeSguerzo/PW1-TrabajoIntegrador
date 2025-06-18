//BORRE LOS ID´S DEL INPUT DEL INPUT RADIO Y INGRESO DE NUMERO.
//BORRE LOS ID´S DEL INPUT DE CONTRASEÑA Y REPETIR CONTRASEÑA POR QUE ESTABAN REPETIDOS

// AGREGUE CLASS A LOS INPUT´S DEL .DATOSDEUSUARIO. (HTML) Y MODIFIQUE LOS SELECTORES EN EL CSS, 
// LO LLAME DE MANERA DIRECTA (.FORM-DATOS), NO DE SELECTOR A SELECTOR, ANTES LO LLAMABA .FORMULARIO .DATOSDEUSUARIO INPUT.
// AL PARECER LOS EVENTOS DE "SUBMIT" SE ESTAN PISANDO EN LOS DOS ARCHIVOS JS.

// - SOLO 3 DIGITOS NI MAS NI MENOS
// - SOLAMENTE NUMEROS
// - QUE NO SEA 0 NI 000
// - QUE NO TENGA ESPACIOS
// - TIENE QUE SER REQUERIDO UNO DE LOS TRES METODOS DE PAGO (CREO)

const formulario = document.querySelector(".formulario");
const inputs = document.querySelectorAll(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad, .metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta");
const radio = document.getElementById("radioTarjeta");

const expresiones = {
    numeroDeTarjeta: /^\d{16}$/,
    claveTarjeta: /^\d{3}$/
}

function habilitarTarjeta() {
    radio.addEventListener("change", function () {
        if (this.checked) {
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").disabled = false;
        } else {
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").disabled = true;
        }
    });
}

habilitarTarjeta();

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
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").classList.remove("validacion-incorrecta");
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").classList.add("validacion-correcta");
        document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "none";
    } else {
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").classList.add("validacion-incorrecta");
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").classList.remove("validacion-correcta");
        document.querySelector(".numeroDeTarjeta-incorrecto").style.display = "flex";
    };
}

function validacionClaveDeLaTarjeta() {
    const claveErronea = 0;
    const claveDeLaTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").value;
    const esValido = expresiones.claveTarjeta.test(claveDeLaTarjeta);

    if (esValido == true && claveDeLaTarjeta != claveErronea) {
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-incorrecta");
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.add("validacion-correcta");
        document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "none";
    } else {
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.add("validacion-incorrecta");
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-correcta");
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
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-correcta");
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-incorrecta");
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").classList.remove("validacion-correcta");
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__numeroDeTarjeta").classList.remove("validacion-incorrecta");
        });
    });
}

// formulario.addEventListener("submit", (e) => {
//     e.preventDefault();

//     if (numeroDeTarjetaValido() == true) {
//         formulario.submit();
//     }
// });

// function mensajeInvalido() {
//     let parrafo = document.createElement("p");
//     let mensajeDeError = document.createTextNode("Clave incorrecta");
//     parrafo.appendChild(mensajeDeError);
//     document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito").appendChild(parrafo);
// }

validacionIncorrectaInputs();
validacion();