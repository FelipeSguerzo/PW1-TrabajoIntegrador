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

const btnNingunGenero = document.querySelector(".ningun-genero");

btnNingunGenero.addEventListener("click", function(){

    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
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
});

const btnAccion = document.querySelector(".genero-accion")

btnAccion.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Acción" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);     
            }s               
        }
    }
});

const btnAdolescente = document.querySelector(".genero-adolescente");

btnAdolescente.addEventListener("click", function(){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    for(let elemento of peliculasyseries){
        for(let generos of elemento.genero){
            if(generos === "Adolescente" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);  
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
            if(generos === "Ciencia Ficción" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);  
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
            if(generos === "Comedia" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);  
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
            if(generos === "Drama" && elemento.temporadas == 0){

                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);  
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
            if(generos === "Documental" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);             
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
            if(generos === "Fantasía" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);  
                
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
            if(generos === "Suspenso" && elemento.temporadas == 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                <a href="./info-pelicula.html?titulo=${elemento.titulo}">
                <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                </a>
                `;
                nodoRaiz.appendChild(nodoPeliculaYSerie);  
                
            }
        }
    }
});