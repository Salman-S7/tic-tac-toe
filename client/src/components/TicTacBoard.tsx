import { useState } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */

const TicTacBoard = () => {
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
          </div>
          <div className="w-80 min-h-80 flex justify-center items-center flex-wrap bg-gray-100 gap-[10%]  rounded-md">
            {gameArray.map((btn, i) => (
              <button
                className="w-1/5 h-[90px] bg-slate-400 text-white z-20 border border-black rounded-md"
                key={i}
                onClick={() => (i)}
              >
                {btn}
              </button>
            ))}
          </div>

    </>
  );
};

export default TicTacBoard;
