$(document).ready(function(){

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var pattern = [];
var numBlocks = 9;
var difficulty = 5;
var counter = 0;

function start() {
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
      alert("WIN!");
      pattern = [];
      counter = 0;
    } else {
      counter++;
      }
  } else {
  	alert("FAIL!");
  	pattern = [];
  	counter = 0;
  }
}

document.getElementById('1').onclick = clickReturn;
document.getElementById('2').onclick = clickReturn;
document.getElementById('3').onclick = clickReturn;
document.getElementById('4').onclick = clickReturn;
document.getElementById('5').onclick = clickReturn;
document.getElementById('6').onclick = clickReturn;
document.getElementById('7').onclick = clickReturn;
document.getElementById('8').onclick = clickReturn;
document.getElementById('9').onclick = clickReturn;
document.getElementById("start-button").addEventListener("click", start);

});