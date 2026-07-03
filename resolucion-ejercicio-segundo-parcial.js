// Referencias a los elementos del HTML base
const inputTarea = document.querySelector("#input-tarea"); // <input id="input-tarea">
const btnAgregar = document.querySelector("#btn-agregar"); // <button id="btn-agregar">
const listaTareas = document.querySelector("#lista-tareas"); // <ul id="lista-tareas">

// Estado de la aplicación: fuente de verdad
let tareas = []; // arreglo de objetos { id, descripcion }
let nextId = 1; // contador "auto-incremental" para los ids

// Única función que renderiza las tareas
const renderTareas = () => {
  // Reemplazá el innerHTML de listaTareas como "" (vacio).
  listaTareas.innerHTML = "";

  // Recorré las tareas y construí con la informacion de cada una el HTML de cada <li> y agregalos en el innerHTML de listaTareas (reemplaza todo).
  tareas.forEach((tarea) => {
    listaTareas.innerHTML += `
      <li data-id=${tarea.id}>
      <span class="texto-tarea">${tarea.descripcion}</span>
      <div class="acciones">
        <button class="btn-info">Ver info</button>
        <button class="btn-eliminar">Eliminar</button>
        <button class="btn-editar">Editar</button>
      </div>
      </li>
  `;
  });

  // listaTareas.innerHTML = tareas.map(tarea => {
  //   return `
  //     <li data-id=${tarea.id}>
  //     <span class="texto-tarea">${tarea.descripcion}</span>
  //     <div class="acciones">
  //       <button class="btn-info">Ver info</button>
  //       <button class="btn-eliminar">Eliminar</button>
  //     </div>
  //     </li>
  // `
  // }).join("")
};

// Busca una tarea en el arreglo por id y muestra su descripcion
const verInfoTarea = (id) => {
  // Buscá la tarea en tareas con el find() usando el id recibido.
  const tareaEncontrada = tareas.find((tarea) => tarea.id === id);

  // Mostrá su descripcion con console.log().
  console.log(tareaEncontrada.descripcion);
};

// Elimina una tarea del arreglo por id y actualiza el DOM
const eliminarTarea = (id) => {
  // Filtrá tareas con filter() para quedarte con las que NO tienen ese id.
  const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);

  // Reasigná tareas con el resultado.
  tareas = tareasFiltradas;

  // Llamá a renderTareas() para reflejar el cambio.
  renderTareas();
};

// Un solo listener en listaTareas maneja los clics de todos los botones (event delegation)
listaTareas.addEventListener("click", (e) => {
  // Obtené con closest('li') el <li> padre del elemento clickeado.
  const elementoPadre = e.target.closest("li");

  // Leé el data-id del <li> y convertilo a número con Number().
  const idPadre = Number(elementoPadre.dataset.id);

  // Si e.target tiene la clase btn-info → llamá a verInfoTarea(id).
  if (e.target.classList.contains("btn-info")) {
    verInfoTarea(idPadre);
  }

  // Si e.target tiene la clase btn-eliminar → llamá a eliminarTarea(id).
  if (e.target.classList.contains("btn-eliminar")) {
    eliminarTarea(idPadre);
  }
});

const mostrarInfo = () => {};

// Punto de entrada: lee el input, crea la tarea y actualiza el estado
const agregarTarea = () => {
  // Leé el value del inputTarea como constante "descripcion"
  const descripcion = inputTarea.value.trim();

  // Si está vacío o solo tiene espacios hacé un return (para que no haga nada)
  if (descripcion === "") {
    return;
  }

  // Creá un objeto { id: nextId++, descripcion } y agregalo a tareas con push()
  const nuevaTarea = { id: nextId++, descripcion };

  tareas.push(nuevaTarea);

  // Llamá a renderTareas() para mostrar la nueva lista de tareas
  renderTareas();

  // Limpiá el value del inputTarea
  inputTarea.value = "";
};

// Conecta el botón agregar con la función
// NO EDITAR LAS LINEAS SIGUIENTES
btnAgregar.addEventListener("click", agregarTarea);
