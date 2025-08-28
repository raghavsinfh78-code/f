const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const emojiBtn = document.getElementById("emoji-btn");

let username = prompt("Enter your name:") || "Anonymous";
socket.emit("set username", username);

// handle send
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

// receive message
socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.classList.add("message");
  if (msg.id === socket.id) {
    item.classList.add("me");
  } else {
    item.classList.add("other");
  }

  item.innerHTML = `<div class="username">${msg.user}</div>${msg.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});



