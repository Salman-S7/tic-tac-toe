import { useEffect, useState, useCallback } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      setSocket(newSocket);
      setIsConnecting(false);
      setError(null);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket closed", event);
      setSocket(null);
      setIsConnecting(false);
      setError("WebSocket connection closed");
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket error", event);
      setError("WebSocket connection failed");
      setIsConnecting(false);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = useCallback(
    (message: unknown) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not connected");
      }
    },
    [socket]
  );

  return { socket, sendMessage, isConnecting, error };
};
