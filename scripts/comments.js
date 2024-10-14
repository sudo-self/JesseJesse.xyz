const firebaseConfig = {
  apiKey: "AIzaSyCF5YRke_9RzuQOONX1vFB05xH8PngENqc",
  authDomain: "svelte-forever.firebaseapp.com",
  databaseURL: "https://svelte-forever-default-rtdb.firebaseio.com",
  projectId: "svelte-forever",
  storageBucket: "svelte-forever.appspot.com",
  messagingSenderId: "226934196830",
  appId: "1:226934196830:web:b6b49ea005be128a26c2cf",
  measurementId: "G-Y492VJ0ZMC"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var database = firebase.database();
var commentsContainer = document.getElementById("comments-container");

function displayComments() {
  database.ref("comments").on("value", function (snapshot) {
    commentsContainer.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      var commentData = childSnapshot.val();
      var comment = commentData.text;
      var timestamp = new Date(commentData.timestamp);

      var commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      var commentTextElement = document.createElement("pre");
      commentTextElement.classList.add("comment-text");
      commentTextElement.textContent = comment;
      commentElement.appendChild(commentTextElement);

      var timestampElement = document.createElement("div");
      timestampElement.classList.add("comment-timestamp");
      timestampElement.textContent = timestamp.toLocaleString();
      commentElement.appendChild(timestampElement);

      commentsContainer.appendChild(commentElement);
    });
  });
}

displayComments();

document.getElementById("comment-form").addEventListener("submit", function (event) {
  event.preventDefault();
  var commentInput = document.getElementById("comment-input").value;
  if (commentInput.trim() !== "") {
    var newCommentRef = database.ref("comments").push();
    newCommentRef.set({
      text: commentInput,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    document.getElementById("comment-input").value = "";
  }
});


  

