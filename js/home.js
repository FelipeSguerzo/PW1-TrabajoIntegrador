
let peliculasyseries = [];
const peliculasJSON = localStorage.getItem("peliculasyseries");

if(!peliculasJSON){
    localStorage.setItem("peliculasyseries", JSON.stringify(DATA_PELICULAS));
    peliculasyseries = DATA_PELICULAS;
}else{
    peliculasyseries = JSON.parse(peliculasJSON);
}

AgregarImgPeli(peliculasyseries);

function AgregarImgPeli(cssSelector){
        const nodoRaiz = document.querySelector(".content");
        for(let elemento of cssSelector){
            const nodoPeliculaYSerie = document.createElement("div");
            nodoPeliculaYSerie.innerHTML = `
            <img src="${elemento.imagen}" alt="${elemento.nombre}" class="img">
            <a href=./info-pelicula.html?nombre=${elemento.nombre}">
        `;
            nodoRaiz.appendChild(nodoPeliculaYSerie);
        }
}