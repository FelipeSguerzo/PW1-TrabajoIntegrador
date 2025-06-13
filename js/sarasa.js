//BORRE LOS ID´S DEL INPUT DEL INPUT RADIO Y INGRESO DE NUMERO.
//BORRE LOS ID´S DEL INPUT DE CONTRASEÑA Y REPETIR CONTRASEÑA POR QUE ESTAN REPETIDOS

// - SOLO 3 DIGITOS NI MAS NI MENOS
// - SOLAMENTE NUMEROS
// - QUE NO SEA 0 NI 000
// - QUE NO TENGA ESPACIOS

const expresiones = {
    claveTarjeta: /^\d{3}$/
}

const inputs = document.querySelectorAll(".formulario input");
console.log(inputs);

function validacionInputs() {
    inputs.forEach((input) => {
        input.addEventListener("keyup", function(){
            this.style.backgroundColor = "red";
        });
    });
}

validacionInputs();

function validacionClaveDeLaTarjeta() {
    const claveErronea = "000";
    const claveErroneaEntero = parseInt(claveErronea);

    const claveDeLaTarjeta = document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad");

    claveDeLaTarjeta.addEventListener("keypress", function() {
        if (expresiones.claveTarjeta.test(claveDeLaTarjeta.value)){
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").style.backgroundColor = "red";
        } else {
            document.querySelector(".metodoDePago__tarjetaDeDebitoOCredito__codigoDeSeguridad").style.backgroundColor = "blue";
        }
    });

    const claveIngresada = parseInt(claveDeLaTarjeta.value);
}

validacionClaveDeLaTarjeta();
