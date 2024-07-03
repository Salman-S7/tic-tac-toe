import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket';

const TicTacToeGame = () => {
  const [gameArray, setGameArray] = useState<string[]>([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ]);
  const { socket } = useSocket();

  const makeMove = (i: number) => {
    if (gameArray[i]) {
      console.log("not a valid move client")
      return;
    }
    if (!socket) return;
    const playerId = localStorage.getItem("playerId");
    const gameId = localStorage.getItem("gameId");
    const playerSign = localStorage.getItem("playerSign");

    if (!playerId || !gameId || !playerSign) {
      return alert("Invalid");
    }

    socket?.send(JSON.stringify({ playerId, gameId, playerSign, move: i }));

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "gameUpdate") {
        const { updatedMoves, result } = data;
        setGameArray(updatedMoves);
        if (result !== "Still playing") {
          alert(result);
        }
      }
    }
    
  }

    

  return (
    <>
      <div className="flex gap-4 my-[10vh] items-center">
        <h3>You are playing as {localStorage.getItem("playerSign") } </h3>
      </div>
      <div className="w-80 min-h-80 flex justify-center items-center flex-wrap bg-gray-100 gap-[10%]  rounded-md">
        {gameArray.map((btn: string, i: number) => (
          <button
            className="w-1/5 h-[90px] bg-slate-400 text-white z-20 border border-black rounded-md"
            key={i}
            onClick={() => makeMove(i)}
          >
            {btn}
          </button>
        ))}
      </div>
    </>
  );
}

export default TicTacToeGame
