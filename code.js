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


const labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
];

const data = {
	labels: labels,
	datasets: [{
		label: 'My First dataset',
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgb(255, 99, 132)',
		data: [0, 10, 5, 2, 20, 30, 45],
	}]
};

const options = {
		responsive: true,
		title: {
			display: true,
			text: 'Chart.js Line Chart'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
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
}

function update() {
	chart.update();
}


window.onload = init();