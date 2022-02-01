// Globals
var chart

// Colors
var rad = document.colors.color;
var prev = null;
for (var choice of rad) {
	choice.addEventListener("click", function () {
		console.log(this.value);
		data.datasets[0].backgroundColor = this.value;
		data.datasets[0].borderColor = this.value;
		update();
	});
}

// Stacked
var stacked = document.stacked;
for (var choice of stacked) {
	choice.addEventListener("click", function () {
		console.log(this.value);
		options.scales.y.stacked = this.value;
		update();
	});
}

// Pie
var radPie = document.types.type;
var prevPie = null;
for (var choicePie of radPie) {
	choicePie.addEventListener("click", function () {
		console.log(this.value);
		chart.destroy();
		var ctx = document.getElementById('easygraphChart').getContext('2d'); // 2d context
		chart = new Chart(
			ctx,
			{
				type: this.value,
				data: data,
				options: options
			}
		);
		update();
	});
}

// Render data list to form input
function renderData(dataSetNum) {
	if (dataSetNum == null) {
		dataSetNum = 0;
	}
	var dataList = document.getElementById("dataList");
	var data = chart.data;
	var dataStr = "";
	for (var i = 0; i < data.datasets[dataSetNum].data.length; i++) {
		// Add a number input for each value and a minus button next to it for removal
		dataList.innerHTML += "<div class='data-item'><input type='number' onchange=updateData() value='" + data.datasets[0].data[i] + "'><button class='btn btn-danger' onclick='removeData(" + i + ")'>-</button></div>";
	}
}

// Removing data
function removeData(i) {
	var dataList = document.getElementById("dataList");
	var data = chart.data;
	data.datasets[0].data.splice(i, 1);
	dataList.innerHTML = "";
	labels.splice(i, 1);
	renderData();
	update();
}

// Adding data
function addDataToDataset() {
	var dataList = document.getElementById("dataList");
	var dataToAdd = document.getElementById("dataFieldX").value;
	data.datasets[0].data.push(parseInt(dataToAdd));
	dataToAdd = document.getElementById("dataFieldY").value;
	data.labels.push(dataToAdd);
	dataList.innerHTML = "";
	renderData();
	update();
}

// Update changed data
function updateData() {
	console.log("updateData");
	var dataList = document.getElementById("dataList");
	update();
}

// Update chart
function resetGraph() {
	var dataList = document.getElementById("dataList");
	data.datasets.forEach((dataset) => {
		dataset.data = [];
	});
	data.labels = [];
	dataList.innerHTML = "";
	renderData();
	update();
}

function updateSelectDatasetsMenu() {
	var select = document.getElementById("dataSets");
	// Add an innerHtml option for each dataset
	for (var i = 0; i < chart.data.datasets.length; i++) {
		select.innerHTML += "<option value='" + i + "'>" + chart.data.datasets[i].label + "</option>";
	}
}

function addDataSet() {
	var dataSets = chart.data.datasets;
	var label = document.getElementById("dataSetLabel").value;
	var newDataSet = {
		label: label,
		backgroundColor: "",
		borderColor: "",
		data: []
	};
	dataSets.push(newDataSet);
	updateSelectDatasetsMenu();
	update();
}

function changeSelectedDataset() {
	var select = document.getElementById("dataSets");
	var selected = select.options[select.selectedIndex].value;
	renderData(selected);
}

function changeTitle() {
	var title = document.getElementById("title").value;
	options.plugins.title.text = title;
	update();
}

function toggleLegend() {
	options.plugins.legend.display = !options.plugins.legend.display;
	console.log("Toggle")
	update();
}



let labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
];

let data = {
	labels: labels,
	datasets: [{
		label: 'Data Set',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: [0, 10, 5, 2, 20, 30, 45],
	}]
};

const options = {
	responsive: true,
	plugins: {
		title: {

			display: true,
			text: 'Chart'
		},
		legend: {
			display: true,
			position: 'top',
			labels: {
				fontColor: 'rgb(255, 99, 132)'
			}
		},
	},
	tooltips: {
		mode: 'index',
		intersect: false,
	},
	hover: {
		mode: 'nearest',
		intersect: true
	},
	scales: {
		x: {
			title: {
				display: true,
				text: "X"
			},
			y: {
				title: {
					display: true,
					text: "Y"
				},
			}
		}
	},
	backgroundColor: 'rgb(255, 99, 132)',
};

const config = {
	type: 'bar',
	data: data,
	options: options

};

function init() {
	var ctx = document.getElementById('easygraphChart').getContext('2d'); // 2d context

	chart = new Chart(
		ctx,
		config
	);

	updateSelectDatasetsMenu();
	renderData();
}

function update() {
	chart.update();
}


window.onload = init();