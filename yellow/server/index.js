import {
  createWebSocketServer,
  sendError,
  startPingInterval,
} from "./websocket.js";
import { initializeRPCClient } from "./nitroliteRPC.js";
import logger from "./logger.js";
import dotenv from "dotenv";

dotenv.config();

const wss = createWebSocketServer();
// TODO: Use @erc7824/nitrolite for connection tracking when available
const connections = new Map();

let onlineUsersCount = 0;

const broadcastOnlineUsersCount = () => {
  const message = JSON.stringify({
    type: "onlineUsers",
    count: onlineUsersCount,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      // WebSocket.OPEN
      client.send(message);
    }
  });

  logger.ws(`Broadcasting online users count: ${onlineUsersCount}`);
};

const context = {
  // roomManager,
  connections,
  sendError: (ws, code, msg) => sendError(ws, code, msg),
};

wss.on("connection", (ws) => {
  logger.ws("Client connected");

  // Increment online users count and broadcast to all clients
  onlineUsersCount++;
  broadcastOnlineUsersCount();

  // Handle client messages
  ws.on("message", async (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      return sendError(ws, "INVALID_JSON", "Invalid JSON format");
    }

    // Process message based on type
    try {
      switch (data.type) {
        // case "joinRoom":
        //   await handleJoinRoom(ws, data.payload, context);
        //   break;
        // case "startGame":
        //   await handleStartGame(ws, data.payload, context);
        //   break;
        // case "move":
        //   await handleMove(ws, data.payload, context);
        //   break;
        // case "getAvailableRooms":
        //   await handleGetAvailableRooms(ws, context);
        //   break;
        // case "appSession:signature":
        //   await handleAppSessionSignature(ws, data.payload, context);
        //   break;
        // case "appSession:startGame":
        //   await handleAppSessionStartGame(ws, data.payload, context);
        //   break;
        default:
          sendError(ws, "INVALID_MESSAGE_TYPE", "Invalid message type");
      }
    } catch (error) {
      logger.error(`Error handling message type ${data.type}:`, error);
      sendError(ws, "INTERNAL_ERROR", "An internal error occurred");
    }
  });

  // Handle disconnection
  ws.on("close", () => {
    // Find and remove the player from any room
    for (const [eoa, connection] of connections.entries()) {
      if (connection.ws === ws) {
        // const result = roomManager.leaveRoom(eoa);
        // if (result.success && result.roomId) {
        //   roomManager.broadcastToRoom(result.roomId, 'room:state', {
        //     roomId: result.roomId,
        //     // Send updated room state here
        //   });
        // }
        connections.delete(eoa);
        break;
      }
    }

    // Decrement online users count and broadcast to all clients
    onlineUsersCount = Math.max(0, onlineUsersCount - 1);
    broadcastOnlineUsersCount();

    logger.ws("Client disconnected");
  });
});

async function initializeNitroliteServices() {
  try {
    logger.nitro("Initializing Nitrolite services...");
    const rpcClient = await initializeRPCClient();
    logger.nitro("Nitrolite RPC client initialized successfully");

    // Check if we have an existing channel
    if (rpcClient.channel) {
      logger.nitro("Connected to existing channel");
      logger.data("Channel info", rpcClient.channel);
    } else {
      logger.warn("No channel established after initialization");
      logger.nitro("Channels will be created as needed via getChannelInfo");
    }
  } catch (error) {
    logger.error("Failed to initialize Nitrolite services:", error);
    logger.system("Continuing in mock mode without Nitrolite channel");
  }
}

const port = process.env.PORT || 8080;
logger.system(`WebSocket server starting on port ${port}`);

initializeNitroliteServices()
  .then(() => {
    logger.system("Server initialization complete");
  })
  .catch((error) => {
    logger.error("Server initialization failed:", error);
  });

startPingInterval(wss);

setInterval(() => {
  broadcastOnlineUsersCount();
}, 30000);
