import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

// import gamingImage from '../assets/7973051_3787182-02.svg';
const Home = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [inputId, setInputId] = useState("");

  const joinGame = () => {
    if (!inputId) {
      return alert("Please enter room id to continue");
    }
    if (!socket) return;
    socket?.send(JSON.stringify({ type: "join", gameId: inputId }))
    
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "joined") {
        if (data.message) {
          return alert("There is no room with given ID");
        }
        const { gameId, playerId } = data;
        const playerSign = "O";
        localStorage.setItem("gameId", gameId);
        localStorage.setItem("playerId", playerId);
        localStorage.setItem("playerSign", playerSign);
        navigate("tictac-online");
         
      } else if (data.type === "noGame") {
        return alert("No room found with given code");
      }
    }
  }

  const creteTicTacGame = () => {
 

    socket?.send(JSON.stringify({ type: "create" }));
    console.log("sent the create request");

       if (!socket) return;
       socket.onmessage = (e) => {
         const data = JSON.parse(e.data);
         if (data.type === "created") {
           const { gameId, playerId } = data;
           const playerSign = "X";
           localStorage.setItem("gameId", gameId);
           localStorage.setItem("playerId", playerId);
           localStorage.setItem("playerSign", playerSign);
           navigate("tictac-online");
         }
       };
       
  };

  return (
    <div className="mt-[10vh] h-[90vh] w-full flex items-center justify-center">
      {/* <h1>Lets play games online and kill the time</h1>
      <img className='w-1/3 h-[40vh]' src={gamingImage} alt="" /> */}
      {isWindowOpen ? (
        <div className="h-[90vh] w-full top-[10vh] left-0 flex justify-center absolute items-center">
          <div
            className="absolute h-full w-full top-0 left-0 backdrop-blur-md z-0"
            onClick={() => setIsWindowOpen((w) => !w)}
          ></div>
          <div className="min-h-1/2 w-1/3 flex flex-col rounded-2xl p-8 bg-slate-900 text-white justify-between z-20 gap-4">
            <div className="w-full flex justify-end">
              <span
                className="cursor-pointer"
                onClick={() => setIsWindowOpen((w) => !w)}
              >
                close
              </span>
            </div>

            <div className="">
              <p className="text-sm text-green-300">
                * Create a new game and share generated code with friend to play
                with friend, to join a game enter code shared by friend and
                enjoy...
              </p>
            </div>

            <div className="flex justify-between">
              <button
                className="w-24 py-1 bg-blue-400 rounded-md"
                onClick={creteTicTacGame}
              >
                Create
              </button>
              <div className="flex">
                <input
                  className="w-32 py-1 rounded-l-md focus:outline-none text-black pl-2"
                  type="text"
                  name="gameId"
                  placeholder="Enter room ID"
                  value={inputId}
                  onChange={(e)=> setInputId(e.target.value)}
                />
                <button className="w-24 py-1 bg-green-500 rounded-r-md"
                onClick={joinGame}>
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex gap-4 my-4 flex-col justify-center">
        {/* <button className="bg-zinc-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-stone-950">
          Play with computer
        </button> */}
        <button
          className="bg-zinc-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-stone-950"
          onClick={() => navigate("/tictac-offline")}
        >
          Pass and play
        </button>
        <button
          className="bg-zinc-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-stone-950"
          onClick={() => setIsWindowOpen((w) => !w)}
        >
          Online multiplayer
        </button>
      </div>
    </div>
  );
};

export default Home;
