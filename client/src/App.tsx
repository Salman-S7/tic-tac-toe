import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log("connection established");
      newSocket.send("hello server from client");
    }

    newSocket.onmessage = (messege) => {
      console.log("messege received " + messege);
    }

    setSocket(newSocket);

    return newSocket.close();
  },[])

  return (
    <div className="">
      <h1>Hello there</h1>
    </div>
  );
}

export default App
