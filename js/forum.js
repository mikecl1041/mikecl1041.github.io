
document.querySelector('#submit').addEventListener("click", function() {
	event.preventDefault();
	loadDoc();
});

var db = firebase.firestore();
var ref = db.collection('Forum Content');
var info = [];

function loadDoc() {
	db.collection("Forum Content").add({
		name: document.querySelector('#name').value,
		date: new Date(),
		text: document.querySelector('#text').value,
		link: document.querySelector('#link').value,
		likes: 0
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
}

function query() {
	ref.get().then(function(querySnapshot) {
		querySnapshot.docs.map(function (documentSnapshot,x) {
			info.push(documentSnapshot.data());
			info[x].key = documentSnapshot.id;
		});
	});
}

function populate() {
	for (i=0; i<info.length; i++) {
		document.getElementById("post-container").appendChild(document.createElement("li")).className = "post list-group-item";
		document.querySelectorAll('.post')[i].appendChild(document.createElement("span")).className = "name text-muted small";
		document.querySelectorAll('.post')[i].appendChild(document.createElement("br"))
		document.querySelectorAll('.post')[i].appendChild(document.createElement("span")).className = "date text-muted small";
		document.querySelectorAll('.post')[i].appendChild(document.createElement("span")).className = "float-right likes";
		document.querySelectorAll('.post')[i].appendChild(document.createElement("br"))
		document.querySelectorAll('.post')[i].appendChild(document.createElement("a")).className = "link";
		document.querySelectorAll('.post')[i].querySelector('.link').href = "https://" + info[i].link;
		document.querySelectorAll('.post')[i].querySelector('.link').target = "_blank";
		document.querySelectorAll('.post')[i].appendChild(document.createElement("br"))
		document.querySelectorAll('.post')[i].appendChild(document.createElement("span")).className = "text-entered";
		document.querySelectorAll('.post')[i].querySelector('.name').innerHTML = info[i].name;
		document.querySelectorAll('.post')[i].querySelector('.date').innerHTML = info[i].date;
		document.querySelectorAll('.post')[i].querySelector('.text-entered').innerHTML = info[i].text;
		document.querySelectorAll('.post')[i].querySelector('.link').innerHTML = info[i].link;
		document.querySelectorAll('.post')[i].querySelector('.likes').innerHTML = info[i].likes;
	}
}

document.getElementById("update").addEventListener("click", function() {
	query();
	populate();
});


