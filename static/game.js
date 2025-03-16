const socket = io();

// Kirim pesan ke server
function sendMessage() {
    let message = document.getElementById("chat-input").value;
    socket.emit('send_message', message);
    document.getElementById("chat-input").value = "";

    let fileInput = document.getElementById("image-input");
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            socket.emit('send_image', event.target.result);
        };
        reader.readAsDataURL(file);
        fileInput.value = ""; // Clear the input
    }
}

// Terima pesan dari server
socket.on('receive_message', function(data) {
    let chatBox = document.getElementById("chat-box");
    let newMessage = document.createElement("p");
    newMessage.textContent = data;
    chatBox.appendChild(newMessage);
});

socket.on('receive_image', function(data) {
    let chatBox = document.getElementById("chat-box");
    let newImage = document.createElement("img");
    newImage.src = data;
    newImage.style.maxWidth = "200px"; // Set a max width for the image
    chatBox.appendChild(newImage);
});