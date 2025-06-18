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
    document.getElementById("director").textContent = tituloPeli.directores;
    document.getElementById("productores").textContent = tituloPeli.productores;
    document.getElementById("btn-ver").href = tituloPeli.trailer;
    document.getElementById("iframe").src = tituloPeli.iframe;
    document.getElementById("iframe-movil").src = tituloPeli.iframe;
    document.getElementById("temporada").textContent = tituloPeli.temporadas;
    document.getElementById("capitulos").textContent = tituloPeli.capitulos;
    document.getElementById("temporadasTemporada1").textContent = tituloPeli.temporadas;
    document.getElementById("capitulosTemporada1").textContent = tituloPeli.capitulos;
    if(tituloPeli.clasificacion !=0){
        document.getElementById("clasificacion-detallado").textContent = tituloPeli.clasificacion;
    }
}
