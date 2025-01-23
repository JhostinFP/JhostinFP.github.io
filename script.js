// Asignar eventos de cambio de hora a las tareas iniciales
document.querySelectorAll(".time-start").forEach((input) => {
  input.addEventListener("input", updateTimes);
});
document.querySelectorAll(".time-end").forEach((input) => {
  input.addEventListener("input", updateTimes);
});

// Función para actualizar las horas de inicio y fin de las tareas
function updateTimes() {
  const tasks = document.querySelectorAll(".task");

  let previousEndTime = null;

  tasks.forEach((task, index) => {
    const startInput = task.querySelector(".time-start");
    const endInput = task.querySelector(".time-end");
    const diffSpan = task.querySelector(".time-diff");

    // Evitar cálculos si el usuario está editando un campo
    if (startInput === document.activeElement || endInput === document.activeElement) {
      previousEndTime = parseTime(endInput.value); // Guardar el fin actual para la siguiente tarea
      return;
    }

    // Convertir los tiempos a minutos
    const startTime = parseTime(startInput.value);
    const endTime = parseTime(endInput.value);

    // Validar que las horas sean válidas
    if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) {
      diffSpan.textContent = "N/A"; // Mostrar "N/A" si los tiempos no son válidos
      return;
    }

    // Calcular la diferencia en minutos
    const diffMinutes = endTime - startTime;

    // Mostrar la diferencia en minutos
    diffSpan.textContent = `${diffMinutes} min`;

    // Ajustar la tarea actual si hay un tiempo final previo
    if (previousEndTime !== null) {
      startInput.value = formatTime(previousEndTime); // Actualizar inicio
      endInput.value = formatTime(previousEndTime + diffMinutes); // Actualizar fin
    }

    // Guardar el tiempo final de la tarea actual para la siguiente
    previousEndTime = parseTime(endInput.value);
  });
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
    <div class="task-box" contenteditable="true">Nueva tarea</div>
    <input type="time" class="time-start" value="00:00">
    <input type="time" class="time-end" value="00:30">
    <span class="time-diff">30 min</span>
  `;

  // Añadir la nueva tarea a la lista antes del botón de agregar
  taskList.insertBefore(newTask, taskList.querySelector("#add-task"));

  // Asignar eventos de cambio de hora a la nueva tarea
  newTask.querySelector(".time-start").addEventListener("input", updateTimes);
  newTask.querySelector(".time-end").addEventListener("input", updateTimes);

  // Actualizar todas las tareas para que los tiempos sean consistentes
  updateTimes();
});