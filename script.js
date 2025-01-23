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

  tasks.forEach((task) => {
    const startInput = task.querySelector(".time-start");
    const endInput = task.querySelector(".time-end");
    const diffSpan = task.querySelector(".time-diff");

    // Evitar cálculos si el usuario está editando un campo
    if (startInput === document.activeElement || endInput === document.activeElement) {
      return;
    }

    // Convertir los tiempos a minutos
    const startTime = parseTime(startInput.value);
    const endTime = parseTime(endInput.value);

    // Validar que las horas sean válidas
    if (isNaN(startTime) || isNaN(endTime)) {
      diffSpan.textContent = "N/A"; // Mostrar "N/A" si los tiempos no son válidos
      return;
    }

    // Calcular la diferencia en minutos
    const diffMinutes = endTime - startTime;

    // Mostrar la diferencia en minutos en el campo correspondiente
    diffSpan.textContent = `${diffMinutes} min`;

    // Si hay un tiempo de fin previo, ajustamos los tiempos actuales
    if (previousEndTime !== null) {
      const newStartTime = previousEndTime;
      const newEndTime = previousEndTime + diffMinutes;

      // Actualizar los campos con los nuevos valores
      startInput.value = formatTime(newStartTime);
      endInput.value = formatTime(newEndTime);

      // Actualizamos el tiempo final de esta tarea
      previousEndTime = newEndTime;
    } else {
      // Si no hay tiempo previo, guardar el tiempo final actual
      previousEndTime = endTime;
    }
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