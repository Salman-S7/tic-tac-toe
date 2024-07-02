import { useState } from "react";
import PlayOffline from "./PlayOffline";

/* eslint-disable @typescript-eslint/no-unused-vars */

const TicTacBoard = () => {
  const [player2Turn, setPlayer2Turn] = useState(false);
  const handleCellClick = (i: number) => {};
  const [playOffline, setPlayOffline] = useState(false);
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

  return (
    <>
      <div className="flex gap-4 my-4">
        <button className="bg-zinc-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-stone-950">
          Play with computer
        </button>
        <button
          className="bg-zinc-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-stone-950"
          onClick={() => setPlayOffline((p) => !p)}
        >
          Pass and play
        </button>
        <button className="bg-zinc-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-stone-950">
          Online multiplayer
        </button>
      </div>
      {playOffline ? (
        <PlayOffline />
      ) : (
        <>
          <div className="flex gap-4 my-4">
            <h3>{player2Turn ? "Player 'O's turn" : "Player 'X's turn"}</h3>
          </div>
          <div className="w-80 min-h-80 flex justify-center items-center flex-wrap bg-gray-100 gap-[10%]  rounded-md">
            {gameArray.map((btn, i) => (
              <button
                className="w-1/5 h-[90px] bg-slate-400 text-white z-20 border border-black rounded-md"
                key={i}
                onClick={() => handleCellClick(i)}
              >
                {btn}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default TicTacBoard;
