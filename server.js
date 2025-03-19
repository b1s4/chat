import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" }, // Permitir cualquier origen
});

io.on("connection", (socket) => {
    console.log("🔵 Nuevo usuario conectado:", socket.id);

    socket.on("message", (data) => {
        io.emit("message", data); // Reenviar el mensaje a todos los clientes
    });

    socket.on("disconnect", () => {
        console.log("🔴 Usuario desconectado:", socket.id);
    });
});

// Para compatibilidad con Vercel Serverless
export default function handler(req, res) {
    if (!res.socket.server.io) {
        res.socket.server.io = io;
    }
    res.end();
}

httpServer.listen(3000, () => console.log("🚀 Servidor WebSocket en puerto 3000"));
