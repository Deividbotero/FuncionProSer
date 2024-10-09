const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const calendarBody = document.getElementById("calendarBody");
const monthAndYear = document.getElementById("monthAndYear");
const modal = document.getElementById("serviceModal");
const serviceDateElement = document.getElementById("serviceDate");
const servicesList = document.getElementById("services");
const serviceInput = document.getElementById("serviceInput");
const messageElement = document.getElementById("message");

document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    showCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    showCalendar(currentMonth, currentYear);
});

function showCalendar(month, year) {
    calendarBody.innerHTML = "";
    monthAndYear.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                cell.textContent = "";
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.textContent = date;
                cell.addEventListener("click", () => openModal(date, month, year));
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

function openModal(day, month, year) {
    serviceDateElement.textContent = `Fecha: ${day} de ${months[month]} del ${year}`;
    modal.style.display = "flex";
}

document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
});

document.getElementById("serviceForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const serviceType = serviceInput.value;
    const address = document.getElementById("serviceAddress").value;
    const startTime = document.getElementById("serviceStartTime").value;
    const endTime = document.getElementById("serviceEndTime").value;

    // Validar que la dirección contenga "Bogotá"
    if (!address.toLowerCase().includes("bogotá")) {
        displayMessage("La dirección debe estar en Bogotá.", "error");
        return;
    }

    if (!serviceType || !address || !startTime || !endTime) {
        displayMessage("Por favor, complete todos los campos.", "error");
        return;
    }

    const serviceDate = serviceDateElement.textContent.replace("Fecha: ", "");
    const serviceEntry = `Servicio: ${serviceType} | Dirección: ${address} | Fecha: ${serviceDate} | Hora: ${startTime} - ${endTime}`;

    const listItem = document.createElement("li");
    listItem.textContent = serviceEntry;
    servicesList.appendChild(listItem);

    displayMessage("Servicio agendado con éxito.", "success");
    modal.style.display = "none";
    document.getElementById("serviceForm").reset();
});

function displayMessage(message, type) {
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.style.display = "block";
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 3000);
}

window.onload = () => {
    showCalendar(currentMonth, currentYear);
};
