import { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import "./App.css";
import { useWebSocketNitrolite } from "./hooks/useWebSocketNitrolite";
import { useNitroliteIntegration } from "./hooks/useNitroliteIntegration";
import { useNitrolite } from "./context/NitroliteClientWrapper";

function App() {
  const { error: wsError, lastMessage } = useWebSocket();
  useWebSocketNitrolite();
  const {
    client,
    loading: nitroliteLoading,
    error: nitroliteError,
  } = useNitrolite();

  const { initializeNitroliteClient } = useNitroliteIntegration();

  useEffect(() => {
    if (client && !nitroliteLoading && !nitroliteError) {
      console.log("Initializing Nitrolite client in App component");
      initializeNitroliteClient(client);
    } else if (nitroliteError) {
      console.error("Nitrolite client error:", nitroliteError);
    }
  }, [client, nitroliteLoading, nitroliteError, initializeNitroliteClient]);

  const [onlineUsers, setOnlineUsers] = useState<number>(1);

  useEffect(() => {
    if (lastMessage && lastMessage.type === "onlineUsers") {
      setOnlineUsers(lastMessage.count);
    }
  }, [lastMessage]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="max-w-xl w-full relative z-10">
        <div>Nitrolite Boilerplate</div>
        <div>
          Your Address:{" "}
          {window.ethereum ? window.ethereum.selectedAddress : "not connected"}
        </div>{" "}
        <div>
          Currently Connected App users: {onlineUsers ? onlineUsers : 0}
        </div>
      </div>
    </div>
  );
}

export default App;
