
//Global variables
var db = firebase.firestore();
var ref = db.collection('Forum Content');
var info = [];
var lastVisible;
var copyPostId = null;
var postCount = 0;
var loadCount = 5;
var totalPosts = 0;

// Event listeners
document.querySelector('#submit').addEventListener("click", function() {
	event.preventDefault();
	loadDoc();
	clear();
});
document.getElementById('update').addEventListener("click", function() {
	next();
});
document.querySelector('#post-container').addEventListener("click", function(e) {
	if(e.target.className.indexOf("delete") > 0) {
		db.collection('Forum Content').doc(e.target.parentElement.id).update({active: false});
	} else if(e.target.className.indexOf('like-click') > 0) {
		ref.doc(e.target.parentElement.id).get().then(function(doc) {
			var likeCount = doc.data().likes + 1;
			ref.doc(e.target.parentElement.id).update({likes: likeCount});
			document.getElementById(e.target.parentElement.id).querySelector('.like-count').innerHTML = likeCount;
		});
	} else if (e.target.className.indexOf('reply') > 0) {
		copyPostId = document.getElementById(e.target.parentElement.id).id;
		var copyName = document.getElementById(e.target.parentElement.id).querySelector('.name').innerHTML;
		var copyDate = document.getElementById(e.target.parentElement.id).querySelector('.date').innerHTML;
		var copyPost = document.getElementById(e.target.parentElement.id).querySelector('.text-entered').innerHTML;
		document.getElementById('quoted-post').innerHTML = copyName + " @ " + copyDate + "<br>" + "\"" + copyPost + "\"";
	};
});

//Functions
//Clear Modal inputs
function clear() {
	document.querySelector('#name').value = "";
	document.querySelector('#text').value = "";
}
//Submit doc to Firebase
function loadDoc() {
	db.collection("Forum Content").add({
		name: document.querySelector('#name').value,
		date: new Date(),
		text: document.querySelector('#text').value,
		likes: 0,
		active: true,
		reply: copyPostId
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
}
//Query initial set of docs
function query() {
	ref.orderBy("date").limit(loadCount).get().then(function(querySnapshot) {
		querySnapshot.docs.map(function (documentSnapshot,x) {
			info.push(documentSnapshot.data());
			info[x].key = documentSnapshot.id;
		});
		lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
		populate();
		countUpdate();
	});
}
//Query next set of docs
function next() {
	ref.orderBy("date").startAfter(lastVisible).limit(loadCount).get().then(function(querySnapshot) {
		querySnapshot.docs.map(function (documentSnapshot,x) {
			info.push(documentSnapshot.data());
			info[x].key = documentSnapshot.id;
		});
		if (querySnapshot.docs[querySnapshot.docs.length-1] != undefined) {
			lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
			populate();
			countUpdate();
		} else {
			console.log("No More Documents");
		}
	});
}
//Populate set of docs to HTML
function populate() {
	for (i=0; i<info.length; i++) {
		document.getElementById("post-container").appendChild(document.createElement("li")).className = "post list-group-item " + info[i].active;
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "name text-muted small";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "post-count text-muted small float-right";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "date text-muted small float-right";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		if (info[i].reply != null) {
			document.querySelectorAll('.post')[postCount].appendChild(document.createElement("div")).className = "quoted-text border bg-light rounded font-italic p-1";
			var n = document.getElementById(info[i].reply).querySelector('.name').innerHTML;
			var d = document.getElementById(info[i].reply).querySelector('.date').innerHTML;
			var t = document.getElementById(info[i].reply).querySelector('.text-entered').innerHTML;
			document.querySelectorAll('.post')[postCount].querySelector('.quoted-text').innerHTML = n + " @ " + d + "<br>" + t;
			document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		};
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("span")).className = "text-entered";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("div")).className = "embed";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("br"));
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("button")).className = "btn btn-danger btn-sm delete";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("button")).className = "btn btn-info btn-sm like-click";
		document.querySelectorAll('.post')[postCount].appendChild(document.createElement("button")).className = "btn btn-warning btn-sm reply";
		document.querySelectorAll('.post')[postCount].querySelector('.name').innerHTML = info[i].name;
		document.querySelectorAll('.post')[postCount].querySelector('.post-count').innerHTML = "#" + (postCount + 1);
		document.querySelectorAll('.post')[postCount].querySelector('.date').innerHTML = info[i].date.toLocaleString();
		document.querySelectorAll('.post')[postCount].querySelector('.text-entered').innerHTML = info[i].text;
		document.querySelectorAll('.post')[postCount].querySelector('.delete').innerHTML = "delete";
		document.querySelectorAll('.post')[postCount].querySelector('.like-click').innerHTML = "like ";
		document.querySelectorAll('.post')[postCount].querySelector('.like-click').appendChild(document.createElement("span")).className = "badge badge-light like-count";
		document.querySelectorAll('.post')[postCount].querySelector('.like-count').innerHTML = info[i].likes;
		document.querySelectorAll('.post')[postCount].querySelector('.reply').innerHTML = "reply";
		document.querySelectorAll('.post')[postCount].querySelector('.reply').setAttribute("data-toggle", "modal");
		document.querySelectorAll('.post')[postCount].querySelector('.reply').setAttribute("data-target", "#exampleModal");
		document.querySelectorAll('.post')[postCount].id = info[i].key;
		postCount++;
	}
	info = [];
}
//Update new doc count
function countUpdate() {
	var newPosts = totalPosts - postCount;
	document.getElementById('new-post-count').innerHTML = newPosts + " new"
}

//jQuery functions
$(document).ready(function(){
	$('#exampleModal').on('hide.bs.modal', function (e) {
		copyPostId = null;
		document.getElementById('quoted-post').innerHTML = "";
		clear();
	})
	//Initial page load query
	query();
});

//Firestore listeners
ref.onSnapshot(function(querySnapshot) {
	totalPosts = querySnapshot.size;
	countUpdate();
});

