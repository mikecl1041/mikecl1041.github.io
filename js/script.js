var input = document.getElementById("textInput");
var submit = document.getElementById("submit");

submit.addEventListener("click", onSubmit);

function onSubmit() {
	submittedText.innerHTML = input.value;
	input.value = "";
};
