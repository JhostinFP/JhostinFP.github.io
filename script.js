// Asignamos el evento de cambio de hora a las tareas iniciales
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
    <span class="time-diff">20 min</span> <!-- Diferencia en minutos -->
  `;

  // Añadir la nueva tarea a la lista, justo después de la última tarea
  taskList.insertBefore(newTask, taskList.querySelector("#add-task"));

  // Volver a asignar el evento 'input' a la nueva entrada de tiempo
  newTask.querySelector(".time-start").addEventListener("input", updateTimes);
  newTask.querySelector(".time-end").addEventListener("input", updateTimes);
});
