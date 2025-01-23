// Asignar eventos de // Asignamos el evento de cambio de hora a las tareas iniciales
document.querySelectorAll(".time-start, .time-end").forEach((input) => {
  input.addEventListener("input", updateTimes);
});
document.querySelectorAll(".time-diff").forEach((span) => {
  span.addEventListener("input", updateTimeDiff);
});

// Función para actualizar las horas de inicio y fin de las tareas
function updateTimes() {
  const tasks = document.querySelectorAll(".task");

  let previousEndTime = null;

  tasks.forEach((task) => {
    const startInput = task.querySelector(".time-start");
    const endInput = task.querySelector(".time-end");
    const diffSpan = task.querySelector(".time-diff");

    // Verificar si el usuario está escribiendo en los campos de hora
    if (startInput === document.activeElement || endInput === document.activeElement) {
      return; // Si el campo de hora está siendo editado, no actualizamos
    }

    // Convertimos los tiempos de inicio y fin a minutos
    const startTime = parseTime(startInput.value);
    const endTime = parseTime(endInput.value);

    // Calcular la diferencia en minutos
    const diffMinutes = endTime - startTime;

    // Mostrar la diferencia en minutos en el campo correspondiente
    diffSpan.textContent = `${diffMinutes} min`;

    // Si ya se ha actualizado una tarea anterior, actualizamos la tarea actual
    if (previousEndTime !== null) {
      // La hora de inicio de la tarea actual debe ser igual a la hora de fin de la tarea anterior
      startInput.value = formatTime(previousEndTime);

      // La hora de fin de la tarea actual se ajusta según la duración
      endInput.value = formatTime(previousEndTime + diffMinutes);
    }

    // Guardamos el tiempo final de la tarea actual para usarlo en la siguiente iteración
    previousEndTime = parseTime(endInput.value);
  });
}

// Función para actualizar la diferencia de tiempo cuando el usuario edita el campo time-diff
function updateTimeDiff() {
  const task = this.closest(".task");
  const startInput = task.querySelector(".time-start");
  const diffSpan = task.querySelector(".time-diff");
  const endInput = task.querySelector(".time-end");

  const diffMinutes = parseInt(diffSpan.textContent.replace(" min", ""));

  // Calcular la nueva hora de fin basada en la diferencia
  const startTime = parseTime(startInput.value);
  const newEndTime = startTime + diffMinutes;

  // Actualizar la hora de fin
  endInput.value = formatTime(newEndTime);

  // También se puede actualizar la diferencia si es necesario
  diffSpan.textContent = `${diffMinutes} min`;
}

// Convierte una hora (HH:mm) en minutos totales
function parseTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Convierte minutos totales a formato HH:mm
function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

// Añadir nueva tarea al hacer clic en el botón "Agregar Tarea"
document.getElementById("add-task").addEventListener("click", () => {
  const taskList = document.querySelector(".task-list");

  // Crear una nueva tarea (similar a las existentes)
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.innerHTML = `
    <div class="task-box" contenteditable="true">Nueva tarea</div>
    <input type="time" class="time-start" value="11:10">
    <input type="time" class="time-end" value="11:30">
    <span class="time-diff" contenteditable="true">20 min</span> <!-- Diferencia en minutos -->
  `;

  // Añadir la nueva tarea a la lista, justo después de la última tarea
  taskList.insertBefore(newTask, taskList.querySelector("#add-task"));

  // Volver a asignar los eventos de 'input' a los nuevos campos de hora y diferencia
  newTask.querySelector(".time-start").addEventListener("input", updateTimes);
  newTask.querySelector(".time-end").addEventListener("input", updateTimes);
  newTask.querySelector(".time-diff").addEventListener("input", updateTimeDiff);
}); de hora a las tareas iniciales
function assignEventListeners() {
  document.querySelectorAll(".time-start").forEach((input) => {
    input.addEventListener("input", updateTimes);
  });
  document.querySelectorAll(".time-end").forEach((input) => {
    input.addEventListener("input", updateTimes);
  });
  document.querySelectorAll(".time-diff").forEach((span) => {
    span.addEventListener("input", updateEndTimeFromDiff); // Nuevo evento para editar la diferencia
  });
}

// Función para actualizar las horas y las diferencias en tiempo real
function updateTimes() {
  const tasks = document.querySelectorAll(".task");

  let previousEndTime = null; // Para rastrear el fin de la tarea anterior

  tasks.forEach((task) => {
    const startInput = task.querySelector(".time-start");
    const endInput = task.querySelector(".time-end");
    const diffSpan = task.querySelector(".time-diff");

    // Convertir los tiempos a minutos
    const startTime = parseTime(startInput.value);
    const endTime = parseTime(endInput.value);

    // Validar los tiempos
    if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) {
      diffSpan.textContent = "N/A"; // Mostrar "N/A" si los tiempos son inválidos
      return;
    }

    // Calcular y mostrar la diferencia en minutos
    const diffMinutes = endTime - startTime;
    diffSpan.textContent = `${diffMinutes}`;

    // Ajustar las horas automáticamente si hay una tarea anterior
    if (previousEndTime !== null) {
      startInput.value = formatTime(previousEndTime); // Ajustar inicio
      endInput.value = formatTime(previousEndTime + diffMinutes); // Ajustar fin
    }

    // Guardar el tiempo final de la tarea actual para la siguiente
    previousEndTime = parseTime(endInput.value);
  });
}

// Función para actualizar la hora de fin desde la diferencia de minutos editada
function updateEndTimeFromDiff(event) {
  const task = event.target.closest(".task");
  const startInput = task.querySelector(".time-start");
  const endInput = task.querySelector(".time-end");
  const diffSpan = task.querySelector(".time-diff");

  // Obtener el tiempo de inicio y la diferencia editada
  const startTime = parseTime(startInput.value);
  const diffMinutes = parseInt(event.target.textContent);

  if (isNaN(diffMinutes) || isNaN(startTime)) {
    return;
  }

  // Calcular y actualizar la hora de fin
  const newEndTime = startTime + diffMinutes;
  endInput.value = formatTime(newEndTime);
  updateTimes(); // Llamar a updateTimes para recalcular la diferencia y sincronizar todo
}

// Convierte una hora (HH:mm) en minutos totales
function parseTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Convierte minutos totales a formato HH:mm
function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

// Añadir nueva tarea al hacer clic en el botón "Agregar Tarea"
document.getElementById("add-task").addEventListener("click", () => {
  const taskList = document.querySelector(".task-list");

  // Crear una nueva tarea
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.innerHTML = `
    <div class="task-box" contenteditable="true">Nueva Tarea</div>
    <input type="time" class="time-start" value="00:00">
    <input type="time" class="time-end" value="00:30">
    <span class="time-diff" contenteditable="true">30</span> <!-- Campo editable para la diferencia -->
  `;

  // Insertar la nueva tarea antes del botón de agregar
  taskList.insertBefore(newTask, taskList.querySelector("#add-task"));

  // Asignar eventos de cambio a los nuevos campos
  assignEventListeners();

  // Ejecutar actualización para sincronizar horarios
  updateTimes();
});

// Inicializar los eventos al cargar la página
assignEventListeners();
updateTimes();