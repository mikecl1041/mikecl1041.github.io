
document.querySelector("#add-item").addEventListener("click", function(){
	event.preventDefault();
	var itemText = document.querySelector("#list-item").value
	var li = document.createElement("li");
	var span = document.createElement("span");
	var button = document.createElement("button");
	li.appendChild(span);
	li.appendChild(button);
	button.className = "btn btn-danger float-right delete";
	li.className = "list-group-item";
	span.innerText = itemText;
	button.innerText = "delete";
	document.querySelector("#my-list").appendChild(li);
	document.querySelector("#list-item").value = "";
});

document.querySelector("#my-list").addEventListener("click", function(i) {
	if(i.target.className.indexOf("delete") > 0) {
		var li = i.target.parentElement;
		li.parentElement.removeChild(li);
	}
});

document.querySelector("#search-item").addEventListener("keyup", function(){
	document.querySelectorAll(".list-group-item").forEach(function(li) {
		if(li.firstElementChild.innerText.toLowerCase().indexOf(document.querySelector("#search-item").value.toLowerCase()) < 0) {
			li.style.display = "none";
		} else {
			li.style.display = "initial";
		}
	})
});

