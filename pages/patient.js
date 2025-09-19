export function patientPage () {
    return `
    <div class="patient-container">
    <h2>Patient Management</h2>

    <form class="patient-form">
        <input type="text" placeholder="Full Name" required>
        <input type="text" placeholder="Phone" required>
        <input type="email" placeholder="Email">
        <button type="submit">Add Patient</button>
    </form>

    <table class="patient-table">
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>123456789</td>
            <td>john@example.com</td>
            <td><button class="delete-btn">Delete</button></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>987654321</td>
            <td>jane@example.com</td>
            <td><button class="delete-btn">Delete</button></td>
        </tr>
        </tbody>
    </table>
    </div>
    `;
}