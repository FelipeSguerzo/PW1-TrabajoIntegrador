
let peliculasyseries = [];
const peliculasJSON = localStorage.getItem("peliculasyseries");

if(!peliculasJSON){
    localStorage.setItem("peliculasyseries", JSON.stringify(DATA_PELICULAS));
    peliculasyseries = DATA_PELICULAS;
}else{
    peliculasyseries = JSON.parse(peliculasJSON);
}

AgregarImgPeliYSerie(peliculasyseries);

function AgregarImgPeliYSerie(cssSelector){
    const nodoRaiz = document.querySelector(".content");
    for(let elemento of cssSelector){
        const nodoPeliculaYSerie = document.createElement("div");

        if(elemento.temporadas == 0){
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-pelicula.html?nombre=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
        }else{
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-series.html?nombre=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
        }
        nodoRaiz.appendChild(nodoPeliculaYSerie);
    }
}

const btnPeliculas = document.querySelector(".btn-peliculas");

btnPeliculas.addEventListener("click", function(){
    
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = "";

    for(let elemento of peliculasyseries){
        const nodoPeliculaYSerie = document.createElement("div");

        if(elemento.temporadas == 0){
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-pelicula.html?nombre=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
        }
        nodoRaiz.appendChild(nodoPeliculaYSerie);
    }
});

const btnSeries = document.querySelector(".btn-series");

btnSeries.addEventListener("click", function(){

    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        if(elemento.temporadas !=0){
            const nodoPeliculaYSerie = document.createElement("div");
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-pelicula.html?nombre=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
            nodoRaiz.appendChild(nodoPeliculaYSerie);
        }
    }
});