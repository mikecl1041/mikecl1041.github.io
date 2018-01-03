var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var monthText;
var selectedDay = document.getElementById("selected-day");

document.querySelector("#prev").addEventListener("click", function() {
	prevMonth();
});
document.querySelector("#next").addEventListener("click", function() {
	nextMonth();
});

document.querySelector("#table").addEventListener("click", function(i) {
	if(i.target.innerHTML > 0) {
		selectedDay.innerHTML = monthText + " " + i.target.innerHTML + ", " + year;
	};
});

function clear() {
	document.querySelectorAll(".day").forEach(function(e) {
		e.innerHTML = "";
	})
	selectedDay.innerHTML = "";
};

function nextMonth() {
	if(month < 12) {
		month++;
		clear();
		update();
	} else {
		year++;
		month = 1;
		clear();
		update();
	}
};

function prevMonth() {
	if(month > 1) {
		month--;
		clear();
		update();
	} else {
		year--;
		month = 12;
		clear();
		update();
	}
};

function update() {
	var firstDay = new Date(year, month - 1, 1).getDay() + 1;
	var lastDay = (function daysInMonth(m,y) {
	    return new Date(year, month, 0).getDate();
	})();
	for(i = 0; i < lastDay; i++) {
		document.getElementById(firstDay + i).innerHTML = 1 + i;
	};
	switch (month) {
		case 1:
			monthText = "January";
			break;
		case 2:
			monthText = "February";
			break;
		case 3:
			monthText = "March";
			break;
		case 4:
			monthText = "April";
			break;
		case 5:
			monthText = "May";
			break;
		case 6:
			monthText = "June";
			break;
		case 7:
			monthText = "July";
			break;
		case 8:
			monthText = "August";
			break;
		case 9:
			monthText = "September";
			break;
		case 10:
			monthText = "October";
			break;
		case 11:
			monthText = "November";
			break;
		case 12:
			monthText = "December";
			break;
	}
	document.querySelector("#month").innerHTML = monthText + " " + year;
};

update();

