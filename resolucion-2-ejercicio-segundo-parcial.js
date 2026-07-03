const API_URL = "https://dragonball-api.com/api/characters";

const resultado = document.getElementById("resultado");
const mensajeError = document.getElementById("mensaje-error");

async function buscarPersonaje(id) {
  // Remové la clase 'oculto' de resultado.
  resultado.classList.remove("oculto");
  // Actualizá el innerHTML de resultado con 'Cargando...'.
  resultado.innerHTML = "Cargando...";
  // Agregá la clase 'oculto' a mensajeError.
  mensajeError.classList.add("oculto");

  try {
    // Hacé fetch a `${API_URL}/${id}` con await.
    const response = await fetch(`${API_URL}`);
    // Si !response.ok, devolvé: throw new Error('Personaje no encontrado').
    if (!response.ok) {
      throw new Error("Personaje no encontrado");
    }
    // Parseá el JSON con await response.json().
    const data = await response.json();
    // Extraé solo: name, race, maxKi, image.
    const { name, maxKi, image, race } = data;
    // Actualizá el innerHTML de resultado con lo siguiente (editando según lo que corresponda):
    //    - <img src="image" alt="name" />
    //    - <h2>name</h2>
    //    - <p>race</p>
    //    - <p>maxKi</p>
    resultado.innerHTML = `
        <img src=${image} alt=${name} />
        <h2>${name}</h2>
        <p>${race}</p>
        <p>${maxKi}</p>
    `;
  } catch (error) {
    // Ocultá resultado (agregá 'oculto')
    resultado.classList.add("oculto");
    // Mostrá error.message en mensajeError (antes remové 'oculto')
    mensajeError.classList.remove("oculto");

    mensajeError.textContent = error.message;
  }
}

//NO EDITAR LAS LINEAS SIGUIENTES
document.getElementById("btn-buscar").addEventListener("click", () => {
  const id = document.getElementById("input-id").value.trim();
  if (id) buscarPersonaje(id);
});
