// This file contain all the funcitonality of the website 
const collapse = function () {
    const collapse = document.querySelector('.toggle-info')
    collapse.addEventListener('click', function (e) {
        const btn = e.target.closest('.toggle__btn')
        if (!btn) return

        const toggle = document.querySelector('.toggle-content')
        toggle.classList.toggle('height__full')
        console.log(btn)

        console.log(toggle)

    })
}
collapse()

const chartManagement = function (labels, data) {
    // chart information
    const ctx = document.getElementById('myChart2');
    console.log(ctx)
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [{
                label: 'Hourly Temp Status',
                data: [1, 2, 2, 5, 8, 5, 8, 7,],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
chartManagement()