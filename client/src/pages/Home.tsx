import TicTacBoard from "../components/TicTacBoard"

const Home = () => {
  return (
    <div className="mt-[10vh] flex flex-col items-center justify-center">
      <h1>Lets play Tic tac toe</h1>
      
      <TicTacBoard />
    </div>
  );
}

export default Home