// ========== Element References ========== //
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const employeesSection = document.getElementById('employeesSection');

const showLoginBtn = document.getElementById('showLoginBtn');
const showRegisterBtn = document.getElementById('showRegisterBtn');
const showEmployeesBtn = document.getElementById('showEmployeesBtn');

// Login form fields
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');

// Register form fields
const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');
const registerRole = document.getElementById('registerRole');
const registerBtn = document.getElementById('registerBtn');

// Create employee fields
const empFirstName = document.getElementById('empFirstName');
const empLastName = document.getElementById('empLastName');
const empEmail = document.getElementById('empEmail');
const createEmployeeBtn = document.getElementById('createEmployeeBtn');

// Display employees
const refreshEmployeesBtn = document.getElementById('refreshEmployeesBtn');
const employeesList = document.getElementById('employeesList');

// Update employee fields
const updateEmpId = document.getElementById('updateEmpId');
const updateEmpFirstName = document.getElementById('updateEmpFirstName');
const updateEmpLastName = document.getElementById('updateEmpLastName');
const updateEmpEmail = document.getElementById('updateEmpEmail');
const updateEmployeeBtn = document.getElementById('updateEmployeeBtn');

// Delete employee fields
const deleteEmpId = document.getElementById('deleteEmpId');
const deleteEmployeeBtn = document.getElementById('deleteEmployeeBtn');

// ========== Show/Hide Sections ========== //
function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    employeesSection.style.display = 'none';
}

function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    employeesSection.style.display = 'none';
}

function showEmployees() {
    // Only show employees section if we have a token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first.');
        showLogin();
        return;
    }
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    employeesSection.style.display = 'block';
}

// ========== Event Listeners for Nav Buttons ========== //
showLoginBtn.addEventListener('click', showLogin);
showRegisterBtn.addEventListener('click', showRegister);
showEmployeesBtn.addEventListener('click', showEmployees);

// ========== Auth Handlers ========== //
loginBtn.addEventListener('click', async () => {
    const credentials = {
        username: loginUsername.value.trim(),
        password: loginPassword.value.trim(),
    };

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Login failed: ' + errorText);
            return;
        }

        const token = await response.text(); // The response is just the token string
        localStorage.setItem('token', token);
        alert('Login successful!');
        // Show employees page after login
        showEmployees();
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Check console.');
    }
});

registerBtn.addEventListener('click', async () => {
    const userData = {
        username: registerUsername.value.trim(),
        password: registerPassword.value.trim(),
        role: registerRole.value.trim(), // If empty, server defaults to "USER"
    };

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Registration failed: ' + errorText);
            return;
        }

        const message = await response.text();
        alert(message); // e.g., "User registered successfully"
        // After registering, you might want to auto-switch to login form
        showLogin();
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error during registration. Check console.');
    }
});

// ========== Employee Operations ========== //

// 1) CREATE EMPLOYEE
createEmployeeBtn.addEventListener('click', async () => {
    const newEmployee = {
        firstName: empFirstName.value.trim(),
        lastName: empLastName.value.trim(),
        email: empEmail.value.trim(),
    };

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newEmployee),
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Create Employee failed: ' + errorText);
            return;
        }

        const createdEmployee = await response.json();
        alert('Employee created: ' + JSON.stringify(createdEmployee));
    } catch (error) {
        console.error('Error creating employee:', error);
    }
});

// 2) READ ALL EMPLOYEES
refreshEmployeesBtn.addEventListener('click', fetchAllEmployees);

async function fetchAllEmployees() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/employees', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Fetch employees failed: ' + errorText);
            return;
        }

        const employees = await response.json();
        // Clear the list
        employeesList.innerHTML = '';
        // Populate the list
        employees.forEach(emp => {
            const li = document.createElement('li');
            li.textContent = `ID: ${emp.id} | ${emp.firstName} ${emp.lastName} | ${emp.email}`;
            employeesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

// 3) UPDATE EMPLOYEE
updateEmployeeBtn.addEventListener('click', async () => {
    const id = updateEmpId.value.trim();
    if (!id) {
        alert('Please enter an employee ID to update.');
        return;
    }

    const updatedData = {
        firstName: updateEmpFirstName.value.trim(),
        lastName: updateEmpLastName.value.trim(),
        email: updateEmpEmail.value.trim(),
    };

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Update failed: ' + errorText);
            return;
        }

        const updatedEmployee = await response.json();
        alert('Employee updated: ' + JSON.stringify(updatedEmployee));
    } catch (error) {
        console.error('Error updating employee:', error);
    }
});

// 4) DELETE EMPLOYEE
deleteEmployeeBtn.addEventListener('click', async () => {
    const id = deleteEmpId.value.trim();
    if (!id) {
        alert('Please enter an employee ID to delete.');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Delete failed: ' + errorText);
            return;
        }

        const msg = await response.text();
        alert(msg); // e.g. "Employee deleted successfully"
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
});
