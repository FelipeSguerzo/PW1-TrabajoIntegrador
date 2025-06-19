const params = new URLSearchParams(window.location.search);
const titulo = params.get("titulo");

const tituloPeli = peliculasyseries.find(p => p.titulo.toLowerCase() === titulo.toLowerCase());

if(tituloPeli){
    document.getElementById("imagen").src = tituloPeli.heroimg;
    document.getElementById("pelicula-titulo").textContent = tituloPeli.titulo;
    if(tituloPeli.clasificacion != 0){
        document.getElementById("clasificacion").textContent = tituloPeli.clasificacion;
    }
    document.getElementById("año").textContent = tituloPeli.año;
    document.getElementById("generos").textContent = tituloPeli.genero;
    document.getElementById("descripcion").textContent = tituloPeli.descripcion;
    document.getElementById("titulo-detallado").textContent = tituloPeli.titulo;
    document.getElementById("descripcion-detallada").textContent = tituloPeli.resumen;
    document.getElementById("elenco").textContent = tituloPeli.elenco;
    document.getElementById("generos-detallado").textContent = tituloPeli.genero;
    document.getElementById("año-detallado").textContent = tituloPeli.año;
    document.getElementById("iframe").src = tituloPeli.iframe;
    document.getElementById("iframe-movil").src = tituloPeli.iframe;
    if(tituloPeli.clasificacion !=0){
        document.getElementById("clasificacion-detallado").textContent = tituloPeli.clasificacion;
    }
    document.getElementById("btn-ver").href = tituloPeli.trailer;
    document.getElementById("director").textContent = tituloPeli.directores;
    document.getElementById("productores").textContent = tituloPeli.productores;
}

function App(){}
    window.onload = function(event){
        var app = new App();
        window.app = app;

    }

    App.prototype.processingButton = function(event){
        const btn = event.currentTarget;
        const carruselList = event.currentTarget.parentNode;
        track = event.currentTarget.parentNode.querySelector("#track");
        const carrusel = track.querySelectorAll(".carrusel");
        
        const carruselWidth = carrusel[0].offsetWidth;
        
        const trackWidth = track.offsetWidth;
        const listWidth = carruselList.offsetWidth;

        track.style.left == "" ? leftPosition = track.style.left = 0: leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
        btn.dataset.button == "button-prev" ? prevAction(leftPosition, carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track);
    }

    let prevAction = (leftPosition, carruselWidth, track) => {
        if(leftPosition > 0){
            track.style.left = `${-1 * (leftPosition -carruselWidth)}px`;
        }
    }

    let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) =>{
        if(leftPosition < (trackWidth - listWidth)){
            track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
        }
    }