// Initialize the totalWater variable to keep track of total intake for the day
let totalWater = 0;
let waterIntakeChart; // Variable to store the chart instance

// Function to get daily water intake data
function getDailyData(entries) {
    const today = moment().format('YYYY-MM-DD');
    const dailyData = {};
    totalWater = 0; // Reset total water intake
    entries.forEach(entry => {
        const date = moment(entry.timestamp).format('YYYY-MM-DD');
        if (date === today) {
            totalWater += entry.waterIntake;
        }
        if (dailyData[date]) {
            dailyData[date] += entry.waterIntake;
        } else {
            dailyData[date] = entry.waterIntake;
        }
    });
    return dailyData;
}


// Function to update the graphical representation of water intake
function updateGraph() {
    const waterEntries = Lockr.get('waterEntries', []);
    const dailyData = getDailyData(waterEntries);
    const ctx = document.getElementById('waterIntakeChart').getContext('2d');

    // Destroy existing chart instance if it exists
    if (waterIntakeChart) {
        waterIntakeChart.destroy();
    }

    waterIntakeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(dailyData),
            datasets: [{
                label: 'Daily Water Intake (ml)',
                data: Object.values(dailyData),
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to log water intake
function logWaterIntake() {
    const waterIntake = parseInt(document.getElementById('waterIntake').value);
    if (!isNaN(waterIntake) && waterIntake > 0) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const entry = { timestamp, waterIntake };
        totalWater += waterIntake;
        Lockr.set('waterEntries', Lockr.get('waterEntries', []).concat(entry));
        document.getElementById('totalWaterConsumed').textContent = `${totalWater} ml`;
        document.getElementById('waterIntake').value = '';
        updateGraph();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize the graph
    function initializeGraph() {
        updateGraph();
    }

    // Call the initializeGraph function when the page loads
    initializeGraph();
});
