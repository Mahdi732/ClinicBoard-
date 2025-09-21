export function financePage() {
    let recettes = JSON.parse(localStorage.getItem('clinicApp:recettes')) || [];
    let depenses = JSON.parse(localStorage.getItem('clinicApp:depenses')) || [];

    return `
    <div class="finance-container">
      <h2>Gestion des Recettes & Dépenses</h2>

      <!-- Form Recettes -->
      <div class="add-finance-wrapper">
        <button type="button" class="add-recette-btn">Ajouter une Recette</button>
        <form class="finance-form hidden" id="recette-form">
          <input type="number" placeholder="Montant" id="recette-montant" required>
          <input type="text" placeholder="Méthode de paiement" id="recette-methode" required>
          <input type="text" placeholder="Libellé" id="recette-libelle" required>
          <button type="submit">Enregistrer Recette</button>
        </form>
      </div>

      <!-- Form Dépenses -->
      <div class="add-finance-wrapper">
        <button type="button" class="add-depense-btn">Ajouter une Dépense</button>
        <form class="finance-form hidden" id="depense-form">
          <input type="number" placeholder="Montant" id="depense-montant" required>
          <input type="text" placeholder="Catégorie" id="depense-categorie" required>
          <input type="text" placeholder="Libellé" id="depense-libelle" required>
          <input type="date" id="depense-date" required>
          <button type="submit">Enregistrer Dépense</button>
        </form>
      </div>

      <!-- Table Recettes -->
      <h3>Recettes</h3>
      <table class="finance-table" id="recette-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Montant</th>
            <th>Méthode</th>
            <th>Libellé</th>
          </tr>
        </thead>
        <tbody>
          ${recettes.map((r,i)=>`
            <tr>
              <td>${i+1}</td>
              <td>${r.montant}</td>
              <td>${r.methode}</td>
              <td>${r.libelle}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Table Dépenses -->
      <h3>Dépenses</h3>
      <table class="finance-table" id="depense-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Montant</th>
            <th>Catégorie</th>
            <th>Libellé</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${depenses.map((d,i)=>`
            <tr>
              <td>${i+1}</td>
              <td>${d.montant}</td>
              <td>${d.categorie}</td>
              <td>${d.libelle}</td>
              <td>${d.date}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Budget Mensuel -->
      <h3>Suivi du Budget Mensuel</h3>
      <div id="budget-summary">
        <p>Total Recettes: <span id="total-recettes">0</span> €</p>
        <p>Total Dépenses: <span id="total-depenses">0</span> €</p>
        <p>Solde: <span id="budget-solde">0</span> €</p>
      </div>
    </div>
    `;
}

export function initFinancePage() {
    const recettes = JSON.parse(localStorage.getItem('clinicApp:recettes')) || [];
    const depenses = JSON.parse(localStorage.getItem('clinicApp:depenses')) || [];

    const recetteForm = document.getElementById('recette-form');
    const depenseForm = document.getElementById('depense-form');

    const recetteTable = document.getElementById('recette-table').querySelector('tbody');
    const depenseTable = document.getElementById('depense-table').querySelector('tbody');

    function renderRecettes() {
        const list = JSON.parse(localStorage.getItem('clinicApp:recettes')) || [];
        recetteTable.innerHTML = list.map((r,i)=>`
            <tr>
              <td>${i+1}</td>
              <td>${r.montant}</td>
              <td>${r.methode}</td>
              <td>${r.libelle}</td>
            </tr>
        `).join('');
    }

    function renderDepenses() {
        const list = JSON.parse(localStorage.getItem('clinicApp:depenses')) || [];
        depenseTable.innerHTML = list.map((d,i)=>`
            <tr>
              <td>${i+1}</td>
              <td>${d.montant}</td>
              <td>${d.categorie}</td>
              <td>${d.libelle}</td>
              <td>${d.date}</td>
            </tr>
        `).join('');
    }

    function updateBudget() {
        const totalRecettes = (JSON.parse(localStorage.getItem('clinicApp:recettes')) || []).reduce((acc,r)=> acc + parseFloat(r.montant), 0);
        const totalDepenses = (JSON.parse(localStorage.getItem('clinicApp:depenses')) || []).reduce((acc,d)=> acc + parseFloat(d.montant), 0);
        document.getElementById('total-recettes').textContent = totalRecettes.toFixed(2);
        document.getElementById('total-depenses').textContent = totalDepenses.toFixed(2);
        document.getElementById('budget-solde').textContent = (totalRecettes - totalDepenses).toFixed(2);
    }

    // Toggle Forms
    document.querySelector('.add-recette-btn').addEventListener('click', ()=> {
        recetteForm.classList.toggle('hidden');
    });
    document.querySelector('.add-depense-btn').addEventListener('click', ()=> {
        depenseForm.classList.toggle('hidden');
    });

    // Save Recette
    recetteForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const recettes = JSON.parse(localStorage.getItem('clinicApp:recettes')) || [];
        const recette = {
            montant: document.getElementById('recette-montant').value.trim(),
            methode: document.getElementById('recette-methode').value.trim(),
            libelle: document.getElementById('recette-libelle').value.trim()
        };
        recettes.push(recette);
        localStorage.setItem('clinicApp:recettes', JSON.stringify(recettes));
        renderRecettes();
        updateBudget();
        recetteForm.reset();
        recetteForm.classList.add('hidden');
    });

    // Save Dépense
    depenseForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const depenses = JSON.parse(localStorage.getItem('clinicApp:depenses')) || [];
        const depense = {
            montant: document.getElementById('depense-montant').value.trim(),
            categorie: document.getElementById('depense-categorie').value.trim(),
            libelle: document.getElementById('depense-libelle').value.trim(),
            date: document.getElementById('depense-date').value
        };
        depenses.push(depense);
        localStorage.setItem('clinicApp:depenses', JSON.stringify(depenses));
        renderDepenses();
        updateBudget();
        depenseForm.reset();
        depenseForm.classList.add('hidden');
    });

    // Initial render
    renderRecettes();
    renderDepenses();
    updateBudget();
}
