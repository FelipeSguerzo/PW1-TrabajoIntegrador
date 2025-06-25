const getUsuarioActivo = () => {
  const usuario = localStorage.getItem("usuarioSesionIniciada");
  return usuario ? JSON.parse(usuario) : null;
};

const getUsuarios = () => {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
};

const usuarioActivo = getUsuarioActivo();
const usuarios = getUsuarios();

if (!usuarioActivo) {
  console.log("No hay sesión iniciada");
} else {
  const usuarioIndex = usuarios.findIndex(u => u.username === usuarioActivo.username);

  if (usuarioIndex === -1) {
    console.log("No se encuentra el usuario en el localStorage");
  } else {
    let favoritos = usuarios[usuarioIndex].favoritos || [];

    function agregarFavoritos(listaFavoritos) {
      const nodoRaiz = document.querySelector(".content");
      nodoRaiz.innerHTML = '';

      if (favoritos.length === 0){
        nodoRaiz.textContent = "NO HAY FAVORITOS EN TU LISTA";
      }

      for (let elemento of listaFavoritos) {
        const nodoPeliculaYSerie = document.createElement("div");
        nodoPeliculaYSerie.className = "card";

        const linkHref = elemento.temporadas === 0
          ? `./info-pelicula.html?titulo=${elemento.titulo}`
          : `./info-series.html?titulo=${elemento.titulo}`;

        nodoPeliculaYSerie.innerHTML = `
          <a href="${linkHref}">
            <img src="${elemento.imagen}" alt="${elemento.titulo}" class="img">
          </a>
          <i class="fa-solid fa-heart heart-icon active" title="${elemento.titulo}"></i>
        `;

        nodoRaiz.appendChild(nodoPeliculaYSerie);

        const heart = nodoPeliculaYSerie.querySelector(".heart-icon");

        heart.addEventListener("click", (e) => {
          e.preventDefault();
          const titulo = heart.getAttribute("title");

          const index = favoritos.findIndex(p => p.titulo === titulo);
          if (index !== -1) {
            favoritos.splice(index, 1);
            console.log(`Quitado de favoritos: ${titulo}`);
          }

          usuarios[usuarioIndex].favoritos = favoritos;
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          localStorage.setItem("usuarioSesionIniciada", JSON.stringify(usuarios[usuarioIndex]));

          agregarFavoritos(favoritos); // volver a renderizar
        });
      }

      if (listaFavoritos.length === 0) {
        nodoRaiz.innerHTML = `<p style="color: white; text-align: center;">No tenés favoritos guardados.</p>`;
      }
    }

    agregarFavoritos(favoritos);
  }
}


