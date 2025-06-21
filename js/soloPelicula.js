let peliculasyseries = [];
const peliculasJSON = localStorage.getItem("peliculasyseries");

if(!peliculasJSON){
    localStorage.setItem("peliculasyseries", JSON.stringify(DATA_PELICULAS));
    peliculasyseries = DATA_PELICULAS;
}else{
    peliculasyseries = JSON.parse(peliculasJSON);
}

soloSeries(peliculasyseries);

function soloSeries(cssSelector){

    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of cssSelector){
        if(elemento.temporadas ==0){
            const nodoPeliculaYSerie = document.createElement("div");
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-pelicula.html?titulo=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
            nodoRaiz.appendChild(nodoPeliculaYSerie);
        }
    }
};

function agregarGenero(cssSelector, genero){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of cssSelector){
        for(let generos of elemento.genero){
            if(generos === genero && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-series.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);     
            }               
        }
    }
}

const btnNingunGenero = document.querySelector(".ningun-genero");

btnNingunGenero.addEventListener("click", function(){
    soloSeries(peliculasyseries);
});

const btnAccion = document.querySelector(".genero-accion")

btnAccion.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Acción");
});

const btnAdolescente = document.querySelector(".genero-adolescente");

btnAdolescente.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Adolescente");
});

const btnCF = document.querySelector(".genero-cf");

btnCF.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Ciencia Ficción");
});

const btnComedia = document.querySelector(".genero-comedia");

btnComedia.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Comedia");
});

const btnDrama = document.querySelector(".genero-drama");

btnDrama.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Drama");
});

const btnDocumental = document.querySelector(".genero-documental");

btnDocumental.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Documental");
});

const btnFantasia = document.querySelector(".genero-fantasia");

btnFantasia.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Fantasía");
});

const btnSuspenso = document.querySelector(".genero-suspenso");

btnSuspenso.addEventListener("click", function(){
    agregarGenero(peliculasyseries, "Suspenso");
});