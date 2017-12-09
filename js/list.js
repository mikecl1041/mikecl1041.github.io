
document.querySelector("#add-item").addEventListener("click", function(){
	var item = document.querySelector("#example");
	var newItem = item.cloneNode("true");
	var itemText = document.querySelector("#list-item").value
	newItem.firstElementChild.textContent = itemText;
	newItem.removeAttribute("id");
	document.querySelector("#list-item").value = "";
	document.querySelector("#my-list").appendChild(newItem);
});


