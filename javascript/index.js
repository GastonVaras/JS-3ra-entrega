// Constructor de objeto Tarea
function Tarea(titulo, descripcion, fechaLimite) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaLimite = fechaLimite;
    this.completada = false;
  }
  
  // Array para almacenar las tareas
  const listaTareas = [];
  
  // Obtener elementos HTML
  const tituloInput = document.getElementById('titulo-input');
  const descripcionInput = document.getElementById('descripcion-input');
  const fechaLimiteInput = document.getElementById('fechaLimite-input');
  const addButton = document.getElementById('add-button');
  const filtroSelect = document.getElementById('filtro-select');
  const listaTareasDiv = document.getElementById('lista-tareas');
  
  // Función para agregar una nueva tarea
  function agregarTarea() {
    const titulo = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const fechaLimite = fechaLimiteInput.value;
  
    if (titulo !== '') {
      const nuevaTarea = new Tarea(titulo, descripcion, fechaLimite);
      listaTareas.push(nuevaTarea);
      tituloInput.value = '';
      descripcionInput.value = '';
      fechaLimiteInput.value = '';
      mostrarTareas();
    }
  }
  
  // Función para mostrar las tareas
  function mostrarTareas() {
    listaTareasDiv.innerHTML = '';
  
    const tareasFiltradas = filtrarTareas();
  
    tareasFiltradas.forEach(function(tarea) {
      const tareaDiv = document.createElement('div');
      tareaDiv.className = 'tarea';
      const tituloPara = document.createElement('p');
      tituloPara.textContent = 'Título: ' + tarea.titulo;
      const descripcionPara = document.createElement('p');
      descripcionPara.textContent = 'Descripción: ' + tarea.descripcion;
      const fechaLimitePara = document.createElement('p');
      fechaLimitePara.textContent = 'Fecha Límite: ' + tarea.fechaLimite;
      const completadaCheckbox = document.createElement('input');
      completadaCheckbox.type = 'checkbox';
      completadaCheckbox.checked = tarea.completada;
      completadaCheckbox.addEventListener('change', function() {
        tarea.completada = completadaCheckbox.checked;
        mostrarTareas(); // Actualizar la visualización cuando cambie el checkbox
      });
  
      tareaDiv.appendChild(tituloPara);
      tareaDiv.appendChild(descripcionPara);
      tareaDiv.appendChild(fechaLimitePara);
      tareaDiv.appendChild(completadaCheckbox);
      listaTareasDiv.appendChild(tareaDiv);
    });
  }
  
// Función para filtrar las tareas según la opción de filtro seleccionada
function filtrarTareas() {
    const valorFiltro = filtroSelect.value;
    const tareasFiltradas = [];
  
    listaTareas.forEach(function(tarea) {
      if (valorFiltro === 'todo' || (valorFiltro === 'completada' && tarea.completada) || (valorFiltro === 'pendiente' && !tarea.completada)) {
        tareasFiltradas.push(tarea);
      }
    });
  
    return tareasFiltradas;
  }
  
  // Agregar evento al cambiar el filtro
  filtroSelect.addEventListener('change', function() {
    mostrarTareas();
  });
  
  // Agregar el event listener al botón "Agregar Tarea"
  addButton.addEventListener('click', agregarTarea);
  
  // Visualización inicial de las tareas
  mostrarTareas();
  