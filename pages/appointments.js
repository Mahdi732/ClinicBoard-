export function appointmentPage() {
    let appointments = JSON.parse(localStorage.getItem('clinicApp:appointments')) || [];

    return `
    <div class="appointment-container">
      <h2>Gestion des rendez-vous</h2>

      <div class="add-appointment-wrapper">
        <button type="button" class="add-appointment-btn">Ajouter un rendez-vous</button>
      </div>

      <!-- Appointment Form -->
      <form class="appointment-form hidden" id="appointment-form">
        <select id="patient" required>
          <option value="">--Sélectionner patient--</option>
        </select>
        <input type="text" placeholder="Praticien" id="practitioner" required>
        <input type="text" placeholder="Salle" id="room" required>
        <input type="text" placeholder="Type" id="type" required>
        <input type="number" placeholder="Durée (min)" id="duration" required>
        <input type="datetime-local" id="datetime" required>
        <select id="status">
          <option value="planifié">Planifié</option>
          <option value="réalisé">Réalisé</option>
          <option value="annulé">Annulé</option>
          <option value="no-show">No-Show</option>
        </select>
        <button type="submit">Créer</button>
      </form>

      <!-- Filters -->
      <div class="filters">
        <input type="text" id="filter-practitioner" placeholder="Filtrer par praticien">
        <select id="filter-status">
          <option value="">Tous les statuts</option>
          <option value="planifié">Planifié</option>
          <option value="réalisé">Réalisé</option>
          <option value="annulé">Annulé</option>
          <option value="no-show">No-Show</option>
        </select>
      </div>

      <!-- Table Vue Jour -->
      <h3>Liste des rendez-vous</h3>
      <table class="appointment-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Praticien</th>
            <th>Salle</th>
            <th>Type</th>
            <th>Durée</th>
            <th>Date & Heure</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="appointment-tbody">
          ${appointments.map((a, i) => `
            <tr data-index="${i}">
              <td>${i + 1}</td>
              <td>${a.patient}</td>
              <td>${a.practitioner}</td>
              <td>${a.room}</td>
              <td>${a.type}</td>
              <td>${a.duration} min</td>
              <td>${a.datetime}</td>
              <td>${a.status}</td>
              <td>
                <button class="edit-btn">Modifier</button>
                <button class="delete-btn">Supprimer</button>
                <button class="cancel-btn">Annuler</button>
                <button class="noshow-btn">No-Show</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Vue Jour -->
      <h3>Vue Jour (Agenda)</h3>
      <table class="agenda-table">
        <thead>
          <tr><th>Heure</th><th>Rendez-vous</th></tr>
        </thead>
        <tbody id="agenda-body"></tbody>
      </table>
    </div>
    `;
}


export function initAppointmentPage() {
    const form = document.getElementById('appointment-form');
    const tbody = document.getElementById('appointment-tbody');
    const patientSelect = document.getElementById('patient');
    const filterPractitioner = document.getElementById('filter-practitioner');
    const filterStatus = document.getElementById('filter-status');
    const agendaBody = document.getElementById('agenda-body');

    let appointments = JSON.parse(localStorage.getItem('clinicApp:appointments')) || [];
    let patients = JSON.parse(localStorage.getItem('clinicApp:patients')) || [];

    // Remplir select patients
    patientSelect.innerHTML = `<option value="">--Sélectionner patient--</option>` +
        patients.map(p => `<option value="${p.name}">${p.name}</option>`).join('');

    // Render table
    function renderTable(list = appointments) {
        tbody.innerHTML = list.map((a, i) => `
          <tr data-index="${i}">
            <td>${i + 1}</td>
            <td>${a.patient}</td>
            <td>${a.practitioner}</td>
            <td>${a.room}</td>
            <td>${a.type}</td>
            <td>${a.duration} min</td>
            <td>${a.datetime}</td>
            <td>${a.status}</td>
            <td>
              <button class="edit-btn">Modifier</button>
              <button class="delete-btn">Supprimer</button>
              <button class="cancel-btn">Annuler</button>
              <button class="noshow-btn">No-Show</button>
            </td>
          </tr>
        `).join('');
        renderAgenda();
    }

    // Render agenda simple (jour)
    function renderAgenda() {
        let today = new Date().toISOString().split("T")[0];
        agendaBody.innerHTML = "";
        for (let h = 0; h < 24; h++) {
            let hourStr = h.toString().padStart(2,"0")+":00";
            let slot = appointments.filter(a => a.datetime.startsWith(today) && a.datetime.includes(hourStr));
            agendaBody.innerHTML += `
              <tr>
                <td>${hourStr}</td>
                <td>${slot.map(s => `${s.patient} (${s.practitioner}, ${s.status})`).join("<br>") || "-"}</td>
              </tr>
            `;
        }
    }

    // Toggle form
    document.querySelector('.add-appointment-btn').addEventListener('click', () => {
        form.classList.toggle('hidden');
    });

    // Create appointment
    form.addEventListener('submit', e => {
        e.preventDefault();
        const appointment = {
            patient: patientSelect.value,
            practitioner: document.getElementById('practitioner').value.trim(),
            room: document.getElementById('room').value.trim(),
            type: document.getElementById('type').value.trim(),
            duration: document.getElementById('duration').value.trim(),
            datetime: document.getElementById('datetime').value,
            status: document.getElementById('status').value
        };
        if (!appointment.patient || !appointment.practitioner) return alert("Patient et praticien requis");

        appointments.push(appointment);
        localStorage.setItem('clinicApp:appointments', JSON.stringify(appointments));
        renderTable();
        form.reset();
        form.classList.add('hidden');
    });

    // Edit/Delete/Cancel/No-Show
    tbody.addEventListener('click', e => {
        const tr = e.target.closest('tr');
        const index = tr.dataset.index;
        const a = appointments[index];

        if (e.target.classList.contains('delete-btn')) {
            if (confirm("Supprimer ce rendez-vous ?")) {
                appointments.splice(index,1);
            }
        }
        if (e.target.classList.contains('edit-btn')) {
            patientSelect.value = a.patient;
            document.getElementById('practitioner').value = a.practitioner;
            document.getElementById('room').value = a.room;
            document.getElementById('type').value = a.type;
            document.getElementById('duration').value = a.duration;
            document.getElementById('datetime').value = a.datetime;
            document.getElementById('status').value = a.status;
            appointments.splice(index,1);
            form.classList.remove('hidden');
        }
        if (e.target.classList.contains('cancel-btn')) {
            appointments[index].status = "annulé";
        }
        if (e.target.classList.contains('noshow-btn')) {
            appointments[index].status = "no-show";
        }

        localStorage.setItem('clinicApp:appointments', JSON.stringify(appointments));
        renderTable();
    });

    // Filters
    function applyFilters() {
        const term = filterPractitioner.value.toLowerCase();
        const status = filterStatus.value;
        let filtered = appointments.filter(a =>
            a.practitioner.toLowerCase().includes(term) &&
            (status === "" || a.status === status)
        );
        renderTable(filtered);
    }
    filterPractitioner.addEventListener('input', applyFilters);
    filterStatus.addEventListener('change', applyFilters);

    // Initial render
    renderTable();
}
