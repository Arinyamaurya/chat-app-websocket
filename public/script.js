// public/script.js

const socket = io();
let username = '';

while (!username) {
    username = prompt('Enter your username:');
}

socket.emit('new-user', username);
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('send-chat-message', input.value.trim());
        input.value = '';
    }
});
// Receive messages
socket.on('chat-message', data => {
    if (data.system) {
        addSystemMessage(data.message);
    } else {
        // Now correct this:
        addMessage(data.username,data.message);//ynha change kiye hai
    }
});

// Function to add message
function addMessage(user , text) {
    const messageElement = document.createElement('div');
    const currentUser = username;

    messageElement.innerText = `${user}: ${text}`;

    messageElement.classList.add('message');
    if (user === currentUser) {
        messageElement.classList.add('self');
    }
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}
// Add system message
function addSystemMessage(text) {
    const systemElement = document.createElement('div');
    systemElement.innerText = text;
    systemElement.classList.add('system-message');
    messages.appendChild(systemElement);
    messages.scrollTop = messages.scrollHeight;
}
