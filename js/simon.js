$(document).ready(function(){

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var pattern = [];
var numBlocks = 9;
var difficulty = 2;
var counter = 0;
var streak = 0;

function start() {
  enableBlocks();
  (function createPattern(max, diff) {
    for(i = 0; i < diff; i++){
      pattern.push(getRandomInt(1,max));
    };
  })(numBlocks, difficulty);
  for(i = 0; i < pattern.length; i++) {
  	(function(i) {
  	  setTimeout(function() {
  	  	$(document.getElementById(pattern[i])).fadeOut().fadeIn();
  	  }, 1000 * i);
  	})(i);
  };
}

function clickReturn () {
  if(this.id == pattern[counter]) {
    if(counter == pattern.length - 1) {
      $(document.getElementById(this.id)).fadeOut("fast").fadeIn("fast");
      $(document.getElementById('streaker')).fadeOut().fadeIn();
      //alert("WIN!");
      pattern = [];
      counter = 0;
      streak++;
      difficulty++;
      document.getElementById("streak").innerHTML = streak;
      start();
    } else {
      $(document.getElementById(this.id)).fadeOut("fast").fadeIn("fast");
      counter++;
      }
  } else {
  	$(document.getElementById(this.id)).fadeOut("fast").fadeIn("fast");
    $(document.getElementById('streaker')).fadeOut().fadeIn();
    //alert("FAIL!");
  	pattern = [];
  	counter = 0;
  	streak = 0;
  	difficulty = 2;
    clearBlocks();
  	document.getElementById("streak").innerHTML = streak;
  }
}

function enableBlocks() {
  document.getElementById('1').onclick = clickReturn;
  document.getElementById('2').onclick = clickReturn;
  document.getElementById('3').onclick = clickReturn;
  document.getElementById('4').onclick = clickReturn;
  document.getElementById('5').onclick = clickReturn;
  document.getElementById('6').onclick = clickReturn;
  document.getElementById('7').onclick = clickReturn;
  document.getElementById('8').onclick = clickReturn;
  document.getElementById('9').onclick = clickReturn;
}

function clearBlocks() {
  document.getElementById('1').onclick = null;
  document.getElementById('2').onclick = null;
  document.getElementById('3').onclick = null;
  document.getElementById('4').onclick = null;
  document.getElementById('5').onclick = null;
  document.getElementById('6').onclick = null;
  document.getElementById('7').onclick = null;
  document.getElementById('8').onclick = null;
  document.getElementById('9').onclick = null;
}

document.getElementById("start-button").addEventListener("click", start);

});