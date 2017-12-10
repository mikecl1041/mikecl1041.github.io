
document.querySelector("#add-item").addEventListener("click", function(){
	var item = document.querySelector("#example");
	var newItem = item.cloneNode("true");
	var itemText = document.querySelector("#list-item").value
	newItem.firstElementChild.textContent = itemText;
	newItem.removeAttribute("id");
	document.querySelector("#list-item").value = "";
	document.querySelector("#my-list").appendChild(newItem);
});

document.querySelector("#my-list").addEventListener("click", function(i) {
	if(i.target.className.indexOf("delete") > 0) {
		var li = i.target.parentElement;
		li.parentElement.removeChild(li);
	}
});

document.querySelector("#search-item").addEventListener("keyup", function(){
	document.querySelectorAll(".list-group-item").forEach(function(li) {
		if(li.firstElementChild.innerText.indexOf(document.querySelector("#search-item").value) < 0) {
			li.style.display = "none";
		} else {
			li.style.display = "initial";
		}
	})
});

