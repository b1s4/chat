const socket = io("https://TU_DOMINIO.vercel.app"); // Reemplaza con la URL de tu backend en Vercel

const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

function sendMessage() {
    const username = usernameInput.value.trim() || "Anónimo";
    const message = messageInput.value.trim();

    if (message === "") return;

    socket.emit("message", { username, message });
    messageInput.value = "";
}

// Recibir mensajes en tiempo real
socket.on("message", (data) => {
    const newMessage = document.createElement("p");
    newMessage.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
});
