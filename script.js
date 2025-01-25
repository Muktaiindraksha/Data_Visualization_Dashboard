document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('Email').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;


    if (username === '' || email === '' || contact === '' || password === '') {
        alert('Please fill out all the fields before Login.');
        return;
    }


    alert('Logged in successfully!');
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('logoutContainer').style.display = 'block';


    updateCharts();
});

document.getElementById('contact').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('logoutContainer').style.display = 'none';
});

document.getElementById('applyFiltersBtn').addEventListener('click', () => {
    updateCharts();
});

document.getElementById('cancelFiltersBtn').addEventListener('click', () => {
    document.getElementById('ageFilter').value = '15-25';
    document.getElementById('genderFilter').value = 'male';
    updateCharts();
});


function getFilteredData(ageRange, gender) {
    const initialData = {
        '15-25': {
            male: [30, 20, 40, 50],
            female: [25, 30, 35, 45],
        },
        '>25': {
            male: [50, 60, 70, 80],
            female: [55, 65, 75, 85],
        },
    };

    return initialData[ageRange][gender];
}


const barChartCtx = document.getElementById('barChart').getContext('2d');
const lineChartCtx = document.getElementById('lineChart').getContext('2d');

const barChart = new Chart(barChartCtx, {
    type: 'bar',
    data: {
        labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        datasets: [
            {
                label: 'Total Time Spent',
                data: getFilteredData('15-25', 'male'),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    },
    options: {
        responsive: true,
    },
});

const lineChart = new Chart(lineChartCtx, {
    type: 'line',
    data: {
        labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        datasets: [
            {
                label: 'Trend Over Time',
                data: getFilteredData('15-25', 'male'),
                borderColor: '#FF6384',
    
            },
        ],
    },
    options: {
        responsive: true,
    },
});


function updateCharts() {
    const ageRange = document.getElementById('ageFilter').value;
    const gender = document.getElementById('genderFilter').value;
    const filteredData = getFilteredData(ageRange, gender);

    barChart.data.datasets[0].data = filteredData;
    barChart.update();

    lineChart.data.datasets[0].data = filteredData;
    lineChart.update();
}

flatpickr('#dateRange', {
    mode: 'range',
    onChange: (selectedDates) => {
        console.log('Selected Date Range:', selectedDates);
    },
});





