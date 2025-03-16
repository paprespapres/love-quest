const socket = io();

// Kirim pesan ke server
function sendMessage() {
    let message = document.getElementById("chat-input").value;
    socket.emit('send_message', message);
    document.getElementById("chat-input").value = "";
}

// Terima pesan dari server
socket.on('receive_message', function(data) {
    let chatBox = document.getElementById("chat-box");
    let newMessage = document.createElement("p");
    newMessage.textContent = data;
    chatBox.appendChild(newMessage);
});
