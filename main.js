$(document).ready(function() {
const table = $('#dt-table').DataTable();
const tableData = getTableData(table);
createHighcharts(tableData);
setTableEvents(table);

});

//Convert HTML table in a data array
function getTableData(table) {
    const dataArray = [],
      stateArray = [],
      positiveArray = [],
      deathArray = [];

    // loop table rows
    table.rows({ search: "applied" }).every(function() {
      const data = this.data();
      stateArray.push(data[0]);
      positiveArray.push(parseInt(data[1].replace(/\,/g, "")));
      deathArray.push(parseInt(data[3].replace(/\,/g, "")));
    });

    // store all data in dataArray
    dataArray.push(stateArray, positiveArray, deathArray);
    return dataArray;
  }

  //Create charts
  function createHighcharts(data){
    Highcharts.chart("chart", {
        chart: {
            zoomType: 'xy'
        },
        title: {
        text: "Coronavirus Outbreak in the US"
        },
        subtitle: {
        text: "Update: November 13, 2020 from covidtracking.com <br>Click and drag in the plot area to zoom in"
        },
        xAxis: [
        {
            categories: data[0],
            labels: {
            rotation: -45
            }
        }
        ],
        yAxis: [
        {
            title: {
            text: "Value"
            }
        }
        ],
        series: [
        {
            name: "Confirmed Cases",
            type: "lollipop",
            data: data[1],
            color: "orange"
        },
        {
            name: "Deaths",
            type: "lollipop",
            data: data[2],
            color: "red"
        }
        ],
        tooltip: {
        shared: true
        },
        legend: {
        backgroundColor: "white",
        shadow: true
        },
        credits: {
        enabled: false
        },
        noData: {
        style: {
            fontSize: "16px"
        }
        }
    });
}

//Listen to users' behavior
let draw = false;

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", () => {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (draw) {
      draw = false;
    } else {
      const tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}