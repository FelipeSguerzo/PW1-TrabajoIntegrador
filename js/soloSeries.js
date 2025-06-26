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
        if(elemento.temporadas !=0){
            const nodoPeliculaYSerie = document.createElement("div");
            nodoPeliculaYSerie.className = "card";
            nodoPeliculaYSerie.innerHTML = `
            <a href="./info-series.html?titulo=${elemento.titulo}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
            </a>
            <i class="fa-solid fa-heart heart-icon" title="${elemento.titulo}"></i>
            `;
            nodoRaiz.appendChild(nodoPeliculaYSerie);
        }
    }
};

function agregarGenero(cssSelector, genero){
    const nodoRaiz = document.querySelector(".content");
    nodoRaiz.innerHTML = '';

    const filtrado = cssSelector.filter(item => item.genero.includes(genero));
    let seEncontro = 0;

    for(let elemento of cssSelector){
        for(let generos of elemento.genero){
            if(generos === genero && elemento.temporadas != 0){
                const nodoPeliculaYSerie = document.createElement("div");

                nodoPeliculaYSerie.innerHTML = `
                    <a href="./info-series.html?titulo=${elemento.titulo}">
                    <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
                    </a>
                    `;
                nodoRaiz.appendChild(nodoPeliculaYSerie); 
                seEncontro++;    
            }           
        }
    }

    if(seEncontro == 0){
        soloSeries(cssSelector);
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

btnNingunGenero.addEventListener("mouseover", () => {
    btnNingunGenero.style.backgroundColor = "#000";
});

btnNingunGenero.addEventListener("mouseout", () => {
    btnNingunGenero.style.backgroundColor = "gray";
});

btnAccion.addEventListener("mouseover", () => {
    btnAccion.style.backgroundColor = "#000";
});

btnAccion.addEventListener("mouseout", () => {
    btnAccion.style.backgroundColor = "gray";
});

btnAdolescente.addEventListener("mouseover", () => {
    btnAdolescente.style.backgroundColor = "#000";
});

btnAdolescente.addEventListener("mouseout", () => {
    btnAdolescente.style.backgroundColor = "gray";
});

btnCF.addEventListener("mouseover", () => {
    btnCF.style.backgroundColor = "#000";
});

btnCF.addEventListener("mouseout", () => {
    btnCF.style.backgroundColor = "gray";
});

btnComedia.addEventListener("mouseover", () => {
    btnComedia.style.backgroundColor = "#000";
});

btnComedia.addEventListener("mouseout", () => {
    btnComedia.style.backgroundColor = "gray";
});

btnDocumental.addEventListener("mouseover", () => {
    btnDocumental.style.backgroundColor = "#000";
});

btnDocumental.addEventListener("mouseout", () => {
    btnDocumental.style.backgroundColor = "gray";
});

btnDrama.addEventListener("mouseover", () => {
    btnDrama.style.backgroundColor = "#000";
});

btnDrama.addEventListener("mouseout", () => {
    btnDrama.style.backgroundColor = "gray";
});

btnFantasia.addEventListener("mouseover", () => {
    btnFantasia.style.backgroundColor = "#000";
});

btnFantasia.addEventListener("mouseout", () => {
    btnFantasia.style.backgroundColor = "gray";
});

btnSuspenso.addEventListener("mouseover", () => {
    btnSuspenso.style.backgroundColor = "#000";
});

btnSuspenso.addEventListener("mouseout", () => {
    btnSuspenso.style.backgroundColor = "gray";
});

const nodoInputSearch = document.querySelector(".search");
nodoInputSearch.addEventListener("keyup", (e) => {
    const nombreABuscar = nodoInputSearch.value.toLowerCase();
    const nodoRaiz = document.querySelector(".content");
    const nodosPeliculas = nodoRaiz.querySelectorAll("div");
    const series = [];

    peliculasyseries.forEach((elemento)=>{
        if(elemento.temporadas!=0){
            series.push(elemento);
        }
    })

     series.forEach((elemento, index) => {
        const titulo = elemento.titulo.toLowerCase();
        console.log(titulo)
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
  console.log("no hay sesión iniciada");
} else {
  const usuarioIndex = usuarios.findIndex(u => u.username === usuarioActivo.username);
  if (usuarioIndex === -1) {
    console.log("no se encuentra el usuario en el localStorage");
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
          console.log(`quitado de favoritos: ${tituloBuscado}`);
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
