
var d = new Date();

var postHold;

var Post = function(name, text, link) {
	this.name = name
	this.date = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear()
	this.text = text
	this.link = link
	this.likes = 0
}

/*document.querySelector("#submit").addEventListener("click", function() {
	event.preventDefault();
	var name = document.querySelector("#name").value;
	var link = document.querySelector("#link").value;
	var text = document.querySelector("#text").value;
	postHold = new Post(name, text, link);
});*/

document.querySelector('#submit').addEventListener("click", function() {
	event.preventDefault();
	loadDoc();
});

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "colors.txt", true);
  xhttp.send();
}