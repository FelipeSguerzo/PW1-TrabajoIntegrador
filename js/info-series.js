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
    //document.getElementById("temporada").textContent = tituloPeli.temporadas;
    //document.getElementById("capitulos").textContent = tituloPeli.capitulos;
    document.getElementById("temporadasTemporada1").value = tituloPeli.temporadas;
    document.getElementById("capitulosTemporada1").value = tituloPeli.capitulos;
    if(tituloPeli.clasificacion !=0){
        document.getElementById("clasificacion-detallado").textContent = tituloPeli.clasificacion;
    }

AgregarTemporadas(peliculasyseries);

function AgregarTemporadas(cssSelector){
    const nodoRaiz = document.getElementById("temporadas-agregar");

    for(let elemento of cssSelector){
        if(elemento.temporadas > 0 && elemento.temporadas == tituloPeli.temporadas){
        const nodoPeliculaYSerie = document.createElement("div");
        nodoPeliculaYSerie.innerHTML = `
            <option id="temporada"> ${elemento.temporadas}</option>
        `;
        nodoRaiz.appendChild(nodoPeliculaYSerie);  
        }
    }
    }

AgregarCapitulos(peliculasyseries);

function AgregarCapitulos(cssSelector){
        const nodoRaiz = document.getElementById("capitulo-agregar");
        for(let elemento of cssSelector){
            if(elemento.capitulos == tituloPeli.capitulos){
            const nodoPeliculaYSerie = document.createElement("div");
            nodoPeliculaYSerie.innerHTML = `
            <option id="temporada" value="temporada1"> ${elemento.capitulos}</option>
            `;  
            nodoRaiz.appendChild(nodoPeliculaYSerie);
            }
    }
}
}

