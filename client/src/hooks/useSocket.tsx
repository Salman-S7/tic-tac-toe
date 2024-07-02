import { useEffect, useState } from "react";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
      const newSocket = new WebSocket("ws://localhost:8080");
      newSocket.onopen = () => {
        console.log("connection established");
        newSocket.send(JSON.stringify({ messege: "hello server from client" }));
      };

      newSocket.onmessage = (messege) => {
        console.log("messege received " + messege);
      };

      setSocket(newSocket);

        return () => {
          newSocket.close();
      } ;
    }, []);

    return socket;
}