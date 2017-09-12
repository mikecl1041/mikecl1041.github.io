var cardBox = document.getElementById("cardInput");
var cardSubmit = document.getElementById("cardSubmit");

cardSubmit.addEventListener("click", onceSubmit);

var cards = "";
var count = 0;
var option = "";

function onceSubmit() {
  cards = document.getElementById("cardInput").value;
  switch(cards) {
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
      count++;
      break;
    case "7":
    case "8":
    case "9":
      break;
    case "10":
    case "J":
    case "Q":
    case "K":
    case "A":
      count--;
      break;
  };
  if (count > 0) {
    option = "Bet";
  } else {
    option = "Hold";
  };
  option = count + " " + option;
  submittedCard.innerHTML = option;
  cardBox.value = "";
};
