import { WebSocketServer } from "ws";
import url from "url";

// Store rooms and their corresponding WebSocket clients
const rooms = new Map();
const roomUsers = new Map();
const userSockets = new Map(); // Map WebSocket to Email

const setupWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server, path: "/ws/" });

  wss.on("connection", (ws, req) => {
    let currentRoom = null;
    let userEmail = null;

    ws.on("message", async (message) => {
      message = message.toString();
      console.log("Received message:", message);

      if (message.startsWith("JOIN:")) {
        currentRoom = message.split(":")[1].trim();

        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, new Set());
          roomUsers.set(currentRoom, new Set());
        }

        rooms.get(currentRoom).add(ws);
        console.log(`Client joined room: ${currentRoom}`);
      } else if (message.startsWith("Email:")) {
        userEmail = message.replace("Email:", "").trim();
        userSockets.set(ws, userEmail);

        if (currentRoom && roomUsers.has(currentRoom)) {
          roomUsers.get(currentRoom).add(userEmail);
          console.log(`User joined with email: ${userEmail}`);

          // Broadcast updated user list
          await broadcastUserList(currentRoom);
        }
      } else if (message.startsWith("Mouse:")) {
        // Handling Mouse Position Broadcasting
        await broadcastMousePosition(currentRoom, message);
      } else {
        // Broadcast messages to other clients in the same room
        if (currentRoom && rooms.has(currentRoom)) {
          for (const client of rooms.get(currentRoom)) {
            if (client !== ws && client.readyState === client.OPEN) {
              try {
                client.send(message);
              } catch (err) {
                console.error("Error broadcasting message:", err.message);
              }
            }
          }
        }
      }
    });

    ws.on("close", async () => {
      if (currentRoom && rooms.has(currentRoom)) {
        rooms.get(currentRoom).delete(ws);

        if (userSockets.has(ws)) {
          const disconnectedEmail = userSockets.get(ws);
          roomUsers.get(currentRoom).delete(disconnectedEmail);
          userSockets.delete(ws);

          // Notify all users in the room
          console.log(
            `Client disconnected from room: ${currentRoom} (Email: ${disconnectedEmail})`
          );
          await broadcastMessage(currentRoom, `DISCONNECT:${disconnectedEmail}`);
          await broadcastUserList(currentRoom);
        }

        // If no users left, keep the room but empty
      }
    });
  });

  // Broadcast updated user list
  const broadcastUserList = async (room) => {
    if (roomUsers.has(room)) {
      const userList = Array.from(roomUsers.get(room)).join(",");
      const clients = rooms.get(room) || new Set();

      for (const client of clients) {
        if (client.readyState === client.OPEN) {
          try {
            client.send(`USERS:${userList}`);
          } catch (err) {
            console.error("Error broadcasting user list:", err.message);
          }
        }
      }
    }
  };

  // Broadcast general messages
  const broadcastMessage = async (room, message) => {
    if (rooms.has(room)) {
      for (const client of rooms.get(room)) {
        if (client.readyState === client.OPEN) {
          try {
            client.send(message);
          } catch (err) {
            console.error("Error broadcasting message:", err.message);
          }
        }
      }
    }
  };

  // Broadcast mouse pointer position
  const broadcastMousePosition = async (room, message) => {
    if (rooms.has(room)) {
      for (const client of rooms.get(room)) {
        if (client.readyState === client.OPEN) {
          try {
            client.send(message); // Forward the exact received mouse position message
          } catch (err) {
            console.error("Error broadcasting mouse position:", err.message);
          }
        }
      }
    }
  };

  console.log("WebSocket server is running.");
};

export default setupWebSocketServer;
