
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
            <a href="./info-pelicula.html?titulo=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
        }else{
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-series.html?titulo=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            `;
        }
        nodoRaiz.appendChild(nodoPeliculaYSerie);
    }
}

const btnNingunGenero = document.querySelector(".ningun-genero");

btnNingunGenero.addEventListener("click", function(){

    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        const nodoPeliculaYSerie = document.createElement("div");

        nodoPeliculaYSerie.innerHTML = `
        <a href="./info-pelicula.html?titulo=${elemento.titulo}">
        <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
        </a>
        `;
        nodoRaiz.appendChild(nodoPeliculaYSerie);  
    } 
});

const btnAccion = document.querySelector(".genero-accion")

btnAccion.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Acción"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnAdolescente = document.querySelector(".genero-adolescente");

btnAdolescente.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Adolescente"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnCF = document.querySelector(".genero-cf");

btnCF.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Ciencia Ficción"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnComedia = document.querySelector(".genero-comedia");

btnComedia.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Comedia"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnDrama = document.querySelector(".genero-drama");

btnDrama.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Drama"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnDocumental = document.querySelector(".genero-documental");

btnDocumental.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Documental"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnFantasia = document.querySelector(".genero-fantasia");

btnFantasia.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Fantasía"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const btnSuspenso = document.querySelector(".genero-suspenso");

btnSuspenso.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Suspenso"){
                if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                }else{
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
});

const nodoInputSearch = document.querySelector(".search");
nodoInputSearch.addEventListener("keyup", (e) => {
    const nombreABuscar = nodoInputSearch.value.toLowerCase();
    const nodoRaiz = document.querySelector(".content");
    const nodosPeliculas = nodoRaiz.querySelectorAll("div");

    peliculasyseries.forEach((elemento, index) => {
        const titulo = elemento.titulo.toLowerCase();
        if (titulo.includes(nombreABuscar)) {
            nodosPeliculas[index].style.display = "block"; // Mostrar si coincide
        } else {
            nodosPeliculas[index].style.display = "none"; // Ocultar si no coincide
        }
    });
});
