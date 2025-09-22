export function dashboardPage() {
    let patients = JSON.parse(localStorage.getItem('clinicApp:patients')) || [];
    let appointments = JSON.parse(localStorage.getItem('clinicApp:appointments')) || [];
    let recettes = JSON.parse(localStorage.getItem('clinicApp:recettes')) || [];
    let depenses = JSON.parse(localStorage.getItem('clinicApp:depenses')) || [];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const recettesMois = recettes.filter(r => {
        const date = new Date(r.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const depensesMois = depenses.filter(d => {
        const date = new Date(d.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const chiffreAffaires = recettesMois.reduce((sum, r) => sum + parseFloat(r.montant), 0);
    const totalDepenses = depensesMois.reduce((sum, d) => sum + parseFloat(d.montant), 0);
    const marge = chiffreAffaires - totalDepenses;

    const budgetProgressPercent = chiffreAffaires > 0 ? Math.min((totalDepenses / chiffreAffaires) * 100, 100) : 0;

    return `
    <div class="dashboard-container">
        <h2>Tableau de bord</h2>

        <div class="kpi-container">
            <div class="kpi-card">
                <h3>Chiffre d’affaires</h3>
                <p>${chiffreAffaires.toFixed(2)} €</p>
            </div>
            <div class="kpi-card">
                <h3>Total Dépenses</h3>
                <p>${totalDepenses.toFixed(2)} €</p>
            </div>
            <div class="kpi-card">
                <h3>Marge</h3>
                <p>${marge.toFixed(2)} €</p>
            </div>
            <div class="kpi-card">
                <h3>Nombre de patients</h3>
                <p>${patients.length}</p>
            </div>
            <div class="kpi-card">
                <h3>Nombre de consultations</h3>
                <p>${appointments.length}</p>
            </div>
        </div>

        <div class="budget-progress">
            <h3>Budget Mensuel</h3>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <p>${totalDepenses.toFixed(2)} € / ${chiffreAffaires.toFixed(2)} €</p>
        </div>

        <div class="navigation-container">
            <button class="nav-btn" data-module="patients">Patients</button>
            <button class="nav-btn" data-module="appointments">Rendez-vous</button>
            <button class="nav-btn" data-module="finance">Recettes/Dépenses</button>
        </div>
    </div>
    `;
}
