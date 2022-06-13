
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

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
    } else {
        var data = google.visualization.arrayToDataTable(convertApiData(datacovid[0]));
    }

    // Optional; add a title and set the width and height of the chart
    var options = {
        'title': 'Total Casos:', 'width': 850, 'height': 600,
        sliceVisibilityThreshold: 0,
         
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
    } else if (graphs == "PieChart") {
        chart = new google.visualization.PieChart(document.getElementById('piechart'));
    } 
    chart.draw(data, options);
}

function convertApiData(datacovid) {
    return [
        ['Covid', 'Percent'],
        ['Total de pruebas realizadas: ' + datacovid.totalTestResults, datacovid.totalTestResults],
        ['Pruebas positivas: ' + datacovid.positive, datacovid.positive],
        ['hospitalizados:' + datacovid.hospitalizedCumulative, datacovid.hospitalizedCumulative],
        ['Total de muertes:' + datacovid.death, datacovid.death],
    ];
}