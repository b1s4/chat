import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" } // Permitir cualquier origen
});

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", (data) => {
        io.emit("message", data); // Reenvía el mensaje a todos los clientes
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

httpServer.listen(3000, () => console.log("Servidor WebSocket en puerto 3000"));
