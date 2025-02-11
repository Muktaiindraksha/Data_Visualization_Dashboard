function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}


function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(nameEQ)) return decodeURIComponent(cookie.substring(nameEQ.length));
    }
    return null;
}


function signup() {
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (!username || !email || !password) {
        alert('Please fill out all fields.');
        return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        alert('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.');
        return;
    }

    setCookie('signupData', JSON.stringify({ username, email, password }), 7);
    alert('Signup successful! Please log in.');
    showLogin();
}


function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert('Please fill out all fields.');
        return;
    }

    const savedData = JSON.parse(getCookie('signupData'));

    if (!savedData) {
        alert('No user found. Please sign up first.');
        showSignup();
        return;
    }

    if (savedData.username === username && savedData.password === password) {
        alert(`Welcome , ${username}!`);
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('logoutContainer').style.display = 'block';
        showAllData();
    } else {
        alert('Invalid credentials. Please check your username and password.');
    }
}


function logout() {
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('logoutContainer').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

const dataSet = {
    '15-25': {
        male: [30, 20, 40, 50],
        female: [25, 30, 35, 45],
    },
    '>25': {
        male: [50, 60, 70, 80],
        female: [55, 65, 75, 85],
    },
};

const barChartCtx = document.getElementById('barChart').getContext('2d');
const lineChartCtx = document.getElementById('lineChart').getContext('2d');

let barChart, lineChart;

function createCharts() {
    barChart = new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
            datasets: [
                {
                    label: 'Total Time Spent',
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    data: []
                },
            ],
        },
    });

    lineChart = new Chart(lineChartCtx, {
        type: 'line',
        data: {
            labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
            datasets: [
                {
                    label: 'Trend Over Time',
                    borderColor: '#FF6384',
                    data: []
                },
            ],
        },
    });
}

createCharts();

function showAllData() {
    const allData = [30, 25, 40, 50];
    updateCharts(allData);
}

function updateCharts(data) {
    barChart.data.datasets[0].data = data;
    barChart.update();

    lineChart.data.datasets[0].data = data;
    lineChart.update();
}

function applyFilters() {
    const age = document.getElementById('ageFilter').value;
    const gender = document.getElementById('genderFilter').value;

    if (dataSet[age] && dataSet[age][gender]) {
        const filteredData = dataSet[age][gender];
        updateCharts(filteredData);
        alert('Filters applied successfully.');
        setCookie('filterData', JSON.stringify({ age, gender }), 7);
    } else {
        alert('No data available for the selected filter.');
    }
}

function cancelFilters() {
    document.getElementById('ageFilter').value = '15-25';
    document.getElementById('genderFilter').value = 'male';
    setCookie('filterData', '', -1);
    showAllData();
}

function loadFilterData() {
    const savedFilters = JSON.parse(getCookie('filterData'));
    if (savedFilters) {
        document.getElementById('ageFilter').value = savedFilters.age;
        document.getElementById('genderFilter').value = savedFilters.gender;
        applyFilters();
    }
}

flatpickr('#dateRange', {
    mode: 'range',
    onChange: (selectedDates) => {
        console.log('Selected Date Range:', selectedDates);
    },
});
