import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import TicTacToeGame from "./pages/TicTacOnline";
import PlayOffline from "./pages/TicTacOfline";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictac-online" element={<TicTacToeGame />} />
        <Route path="/tictac-offline" element={<PlayOffline/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
