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
    nodoRaiz.innerHTML = '';
    for(let elemento of cssSelector){
        const nodoPeliculaYSerie = document.createElement("div");
        nodoPeliculaYSerie.className = "card";

        if(elemento.temporadas == 0){
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-pelicula.html?titulo=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            <i class="fa-solid fa-heart heart-icon" title="${elemento.titulo}"></i>
            `;
        }else{
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-series.html?titulo=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            <i class="fa-solid fa-heart heart-icon" title="${elemento.titulo}"></i>
            `;
        }
        nodoRaiz.appendChild(nodoPeliculaYSerie);
    }
}

function agregarGenero(cssSelector, genero){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    let seEncontro = 0;

    for(let elemento of cssSelector){
        for(let generos of elemento.genero){
            if(generos === genero){
                if(elemento.temporadas != 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                        <a href="./info-series.html?titulo=${elemento.titulo}">
                        <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                        </a>
                        `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);  
                    seEncontro++;   
                }else if(elemento.temporadas == 0){
                    const nodoPeliculaYSerie = document.createElement("div");

                    nodoPeliculaYSerie.innerHTML = `
                        <a href="./info-peli.html?titulo=${elemento.titulo}">
                        <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                        </a>
                        `;
                    nodoRaiz.appendChild(nodoPeliculaYSerie);
                    seEncontro++;
                }
            }       
        }
    }

    if(seEncontro == 0){
        soloSeries(cssSelector);
    } 
}

const btnNingunGenero = document.querySelector(".ningun-genero");

btnNingunGenero.addEventListener("click", function(){
    AgregarImgPeliYSerie(peliculasyseries);
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

const nodoInputSearch = document.querySelector(".search");
nodoInputSearch.addEventListener("keyup", (e) => {
    const nombreABuscar = nodoInputSearch.value.toLowerCase();
    const nodoRaiz = document.querySelector(".content");
    const nodosPeliculas = nodoRaiz.querySelectorAll("div");

    peliculasyseries.forEach((elemento, index) => {
        const titulo = elemento.titulo.toLowerCase();
        if (titulo.includes(nombreABuscar)) {
            nodosPeliculas[index].style.display = "block"; 
        } else {
            nodosPeliculas[index].style.display = "none"; 
        }
    });
});


const heartFav = document.querySelectorAll(".heart-icon");

const getUsuarios = () => {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
};

const getUsuarioActivo = () => {
  const usuario = localStorage.getItem("usuarioSesionIniciada");
  return usuario ? JSON.parse(usuario) : null;
};

const usuarios = getUsuarios();
const usuarioActivo = getUsuarioActivo();

if (!usuarioActivo) {
  console.log("No hay sesión iniciada");
} else {
  const usuarioIndex = usuarios.findIndex(u => u.username === usuarioActivo.username);
  if (usuarioIndex === -1) {
    console.log("No se encuentra el usuario en el localStorage");
  } else {
    let favoritos = usuarios[usuarioIndex].favoritos || [];

    
    heartFav.forEach((element) => {
      const titulo = element.getAttribute("title");
      if (favoritos.some(p => p.titulo === titulo)) {
        element.classList.add("active");
      }
    });

    heartFav.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const tituloBuscado = element.getAttribute("title");
        const peliculaEncontrada = peliculasyseries.find(p => p.titulo === tituloBuscado);

        if (!peliculaEncontrada) return;

        if (element.classList.contains("active")) {
          element.classList.remove("active");
          favoritos = favoritos.filter(p => p.titulo !== tituloBuscado);
          console.log(`qitado de favoritos: ${tituloBuscado}`);
        } else {
          element.classList.add("active");
          favoritos.push(peliculaEncontrada);
          console.log(`agg a favoritos: ${tituloBuscado}`);
        }

        usuarios[usuarioIndex].favoritos = favoritos;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioSesionIniciada", JSON.stringify(usuarios[usuarioIndex]));
        console.log("favs actuales:", favoritos);
      });
    });
  }
}


    if (linkCerrarSesion) {
        linkCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioSesionIniciada");
            window.location.href = "index.html";
        });
    }
