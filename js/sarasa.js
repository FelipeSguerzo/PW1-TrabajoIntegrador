//BORRE LOS ID´S DEL INPUT DEL INPUT RADIO Y INGRESO DE NUMERO.
//BORRE LOS ID´S DEL INPUT DE CONTRASEÑA Y REPETIR CONTRASEÑA POR QUE ESTABAN REPETIDOS

// AGREGUE CLASS A LOS INPUT´S DEL .DATOSDEUSUARIO. (HTML) Y MODIFIQUE LOS SELECTORES EN EL CSS, 
// LO LLAME DE MANERA DIRECTA (.FORM-DATOS), NO DE SELECTOR A SELECTOR, ANTES LO LLAMABA .FORMULARIO .DATOSDEUSUARIO INPUT.


// - SOLO 3 DIGITOS NI MAS NI MENOS
// - SOLAMENTE NUMEROS
// - QUE NO SEA 0 NI 000
// - QUE NO TENGA ESPACIOS
// - TIENE QUE SER REQUERIDO UNO DE LOS TRES METODOS DE PAGO

const expresiones = {
    numeroDeTarjeta: /^\d{16}$/,
    claveTarjeta: /^\d{3}$/
}

const inputs = document.querySelectorAll(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad");
console.log(inputs);

// function validacionNumeroDeTarjeta() {

// }

function validacionClaveDeLaTarjeta() {
    const claveErronea = "000";
    const claveErroneaEntero = parseInt(claveErronea);

    const claveDeLaTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").value;
    const esValido = expresiones.claveTarjeta.test(claveDeLaTarjeta);

    if (esValido == true && claveDeLaTarjeta != claveErroneaEntero) {
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-incorrecta");
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.add("validacion-correcta");
        document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "none";
    } else {
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.add("validacion-incorrecta");
        document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-correcta");
        document.querySelector(".codigoDeSeguridad-incorrecto").style.display = "flex";
    };
}

// function mensajeInvalido() {
//     let parrafo = document.createElement("p");
//     let mensajeDeError = document.createTextNode("Clave incorrecta");
//     parrafo.appendChild(mensajeDeError);
//     document.querySelector(".metodoDePago").appendChild(parrafo);
// }

function validacionIncorrectaInputs() {
    inputs.forEach((input) => {
        input.addEventListener("keyup", function () {
            validacionClaveDeLaTarjeta();
        });
    });
}

function validacion() {
    inputs.forEach((input) => {
        input.addEventListener("blur", function () {
            validacionClaveDeLaTarjeta();
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-correcta");
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").classList.remove("validacion-incorrecta");
        });
    });
}

validacionIncorrectaInputs();
validacion();