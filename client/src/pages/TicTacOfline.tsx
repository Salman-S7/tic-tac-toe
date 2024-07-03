import React, { useState } from "react";

const PlayOffline = () => {
  const [player2Turn, setPlayer2Turn] = useState(false);
  const [player1moves, setPlayer1Moves] = useState<number[]>([]);
  const [player2moves, setPlayer2Moves] = useState<number[]>([]);

  const winnigArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [2, 4, 6],
  ];

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

  const checkWin = (playersMoves: number[]): boolean => {
    for (const winCondition of winnigArray) {
      if (winCondition.every((num) => playersMoves.includes(num))) {
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (i: number) => {
    console.log("clicked " + i);
    const cellIndex = i + 1; // Consistent indexing
    if (player1moves.includes(cellIndex) || player2moves.includes(cellIndex)) {
      return;
    }
    if (!player2Turn) {
      setPlayer1Moves((prevMoves) => {
        const newMoves = [...prevMoves, cellIndex];
        if (checkWin(newMoves)) {
          // Handle win condition for player 1
          console.log("Player 1 has won the match");
        }
        return newMoves;
      });

      setGameArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[i] = "X";
        return newArray;
      });
    } else {
      setPlayer2Moves((prevMoves) => {
        const newMoves = [...prevMoves, cellIndex];
        if (checkWin(newMoves)) {
          // Handle win condition for player 2
          console.log("Player 2 has won the match");
        }
        return newMoves;
      });

      setGameArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[i] = "O";
        return newArray;
      });
    }

    setPlayer2Turn((prev) => !prev);
  };
  return (
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
  );
};

export default PlayOffline;
