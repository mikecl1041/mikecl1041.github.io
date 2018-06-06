
document.querySelector('#submit').addEventListener("click", function() {
	event.preventDefault();
	loadDoc();
});

var db = firebase.firestore();
var ref = db.collection('Forum Content');
var info = [];
var lastVisible;

(function(){
	query();
})();

function loadDoc() {
	db.collection("Forum Content").add({
		name: document.querySelector('#name').value,
		date: new Date(),
		text: document.querySelector('#text').value,
		link: document.querySelector('#link').value,
		likes: 0,
		active: true
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
}

function query() {
	ref.orderBy("date").limit(5).get().then(function(querySnapshot) {
		querySnapshot.docs.map(function (documentSnapshot,x) {
			info.push(documentSnapshot.data());
			info[x].key = documentSnapshot.id;
		});
		lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
	});
}

function next() {
	ref.orderBy("date").startAfter(lastVisible).limit(5).get().then(function(querySnapshot) {
		querySnapshot.docs.map(function (documentSnapshot,x) {
			info.push(documentSnapshot.data());
			info[x].key = documentSnapshot.id;
		});
		if (querySnapshot.docs[querySnapshot.docs.length-1] != undefined) {
			lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
		} else {
			console.log("No More Documents");
		}
		
	});
}

var postCount = 0;

function populate() {
	for (i=0; i<info.length; i++) {
		document.getElementById("post-container").appendChild(document.createElement("li")).className = "post list-group-item " + info[i].active;
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "name text-muted small";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "post-count text-muted small float-right";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "date text-muted small float-right";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("a")).className = "link";
		document.querySelectorAll('.post')[postCount].querySelector('.link').href = "https://" + info[i].link;
		document.querySelectorAll('.post')[postCount].querySelector('.link').target = "_blank";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "text-entered";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("button")).className = "btn btn-danger btn-sm delete";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("button")).className = "btn btn-info btn-sm like-click";
		document.querySelectorAll('.post')[postCount].querySelector('.like-click').innerHTML = "like ";
		document.querySelectorAll('.post')[postCount].querySelector('.like-click').appendChild(document.createElement("span")).className = "badge badge-light like-count";
		document.querySelectorAll('.post')[postCount].querySelector('.name').innerHTML = info[i].name;
		document.querySelectorAll('.post')[postCount].querySelector('.date').innerHTML = info[i].date;
		document.querySelectorAll('.post')[postCount].querySelector('.post-count').innerHTML = "#" + (postCount + 1);
		document.querySelectorAll('.post')[postCount].querySelector('.text-entered').innerHTML = info[i].text;
		document.querySelectorAll('.post')[postCount].querySelector('.link').innerHTML = info[i].link;
		document.querySelectorAll('.post')[postCount].querySelector('.delete').innerHTML = "delete";
		document.querySelectorAll('.post')[postCount].querySelector('.like-count').innerHTML = info[i].likes;
		document.querySelectorAll('.post')[postCount].id = info[i].key;
		postCount++;
	}
	info = [];
	next();
}

document.getElementById("update").addEventListener("click", function() {
	populate();
});

document.querySelector('#post-container').addEventListener("click", function(e) {
	if(e.target.className.indexOf("delete") > 0) {
		db.collection("Forum Content").doc(e.target.parentElement.id).update({active: false});
	} else if(e.target.className.indexOf("like-click") > 0) {
		ref.doc(e.target.parentElement.id).get().then(function(doc) {
			var likeCount = doc.data().likes + 1;
			ref.doc(e.target.parentElement.id).update({likes: likeCount});
			document.getElementById(e.target.parentElement.id).querySelector('.like-count').innerHTML = likeCount;
		});
	};
});

