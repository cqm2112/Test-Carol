
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
var width = 700;
var heigth = 350;
let chart = null;
let selectedGraph = null;

const pieChart = document.getElementById("piechart");
const loader = document.getElementById("loader");

async function drawChart() {
    loader.classList.add('loading');
    pieChart.classList.add('loading');
    var place = document.getElementById("place").value
    const resp = await fetch(`/api/Covid/${place}`);
    const datacovid = await resp.json();
    loader.classList.remove('loading');
    pieChart.classList.remove('loading');

    if (place == 2 || place == 3 || place == 4) {

        var data = google.visualization.arrayToDataTable(convertApiData(datacovid));
        console.log(datacovid.probableCases);
    } else {
        var data = google.visualization.arrayToDataTable(convertApiData(datacovid[0]));
    }

    // Optional; add a title and set the width and height of the chart
    var x = window.matchMedia("(max-width: 650px)")
   
    if (x.matches) {
        width = 400;
        heigth = 300;
        console.log(x.matches);
    } else {
        width = 700;
        heigth = 350;
    }
    var options = {
        'title': 'Total Casos:', 'width': width, 'height': heigth,
        sliceVisibilityThreshold: 0,
        pointShape: {
            type: 'star',
            sides: 4
        },
        responsive: true,
        legend: { shapeType: 'star' },
        colors: ['#393', '#E3E31C', '#E38D1C', '#E31C23','Blue'],
    };

    var graphs = document.getElementById("graphs").value
    const reInit = selectedGraph !== graphs;

    if (!reInit && chart !== null) {
        chart.draw(data, options);
        return;
    }
    selectedGraph = graphs;
    if (graphs == "BarChart") {
        chart = new google.visualization.BarChart(document.getElementById('piechart'));
        options = {
            'title': 'Total Casos:', 'width': width, 'height': heigth,
            sliceVisibilityThreshold: 0,
            responsive: true,
            //tooltips: true,
            colors: ['#393'],
        };
    } else if (graphs == "PieChart") {
        chart = new google.visualization.PieChart(document.getElementById('piechart'));
    }
    chart.draw(data, options);
}
$(window).resize(function () {
    drawChart();
});

function convertApiData(datacovid) {
    return [
        ['Covid', 'Percent'],
        ['Total de pruebas realizadas. ', datacovid.totalTestResults],
        ['Pruebas positivas. ', datacovid.positive],
        ['hospitalizados.' , datacovid.hospitalizedCumulative],
        ['Total de muertes.', datacovid.death],
        ['Casos probables.', datacovid.probableCases],
    ];
   
}