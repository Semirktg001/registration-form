// Initialize data from localStorage
let registeredData = JSON.parse(localStorage.getItem('registeredData')) || [];

// Update the display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayRegisteredData();
});

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        secondName: document.getElementById('secondName').value,
        phone: document.getElementById('phone').value,
        ward: document.getElementById('ward').value,
        lga: document.getElementById('lga').value,
        state: document.getElementById('state').value,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    // Add to registered data
    registeredData.push(formData);

    // Save to localStorage
    localStorage.setItem('registeredData', JSON.stringify(registeredData));

    // Log data (in a real app, this would be sent to a server)
    console.log('Registration submitted:', formData);
    console.log('All registrations:', registeredData);

    // Show success message
    showSuccessMessage();

    // Reset form
    this.reset();

    // Update display
    displayRegisteredData();
});

// Display registered data in table
function displayRegisteredData() {
    const tableBody = document.getElementById('tableBody');
    const totalCount = document.getElementById('totalCount');
    const statNumber = document.getElementById('statNumber');

    // Update counts
    totalCount.textContent = registeredData.length;
    statNumber.textContent = registeredData.length;

    // Clear table
    tableBody.innerHTML = '';

    // Check if there's data
    if (registeredData.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="8">
                    <div class="empty-message">
                        <p>No records yet</p>
                        <small>Data will appear here after submission.</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // Add rows for each registration
    registeredData.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.firstName}</td>
            <td>${record.secondName}</td>
            <td>${record.phone}</td>
            <td>${record.ward}</td>
            <td>${record.lga}</td>
            <td>${record.state}</td>
            <td>${record.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    message.textContent = '✅ Registration submitted successfully!';

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);