#!/bin/bash

echo "Building Webpage With Firebase Chat"

cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firebase Comment Section</title>
 <style>
  body {
    background-color: #fff;
    color: #333;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    padding: 10px 20px;
    text-align: center;
  }

  #comments-container {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    max-height: 50vh;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    color: #333;
  }

  .comment-text {
    color: #333;
  }

  .comment-timestamp {
    color: #555;
  }

  #comment-input {
    width: 20ch;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    color: #333;
  }

  .animated-button {
    background-color: #333;
    color: #fff;
  }

  .animated-button:hover {
    background-color: #555;
  }
</style>

</head>
<body>
  <div class="max-w-xs mx-auto p-4 bg-transparent">
    <div class="container">
      <div id="comments-container"></div>
      <form id="comment-form">
        <input
          type="text"
          id="comment-input"
          class="placeholder-black"
          placeholder="Leave a message..."
        />
        <button
          type="submit"
          class="animated-button"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="fas fa-paper-plane ml-1"></i>
        </button>
      </form>
    </div>
  </div>
  <script src="./scripts/snow.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-database.js"></script>
  <script src="./scripts/comments.js"></script>
</body>
</html>
EOF


mkdir -p scripts
cat <<EOF > scripts/comments.js
// REMINDER: Add your Firebase SDK configuration below

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
EOF

chmod +x index.html
echo "Your Webpage with Comment Section is ready!"
echo "open comments.js add your FIREBASE SDK"



