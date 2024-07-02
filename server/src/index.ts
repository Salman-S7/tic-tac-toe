import express from "express";
import { WebSocketServer } from "ws";
import { TicTacGame } from "./tic-tac-toe/TicTacGame";
import { TicTacPlayer } from "./tic-tac-toe/TicTacPlayer";
import { createRandomId, isValidGame } from "./utils/createId";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("app is listening on port " + 8080);
});

const wss = new WebSocketServer({ server: httpServer });

const games: TicTacGame[] = [];
const winnigArray = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["2", "4", "6"],
];

const checkWin = (playersMoves: string[]): boolean => {
  for (const winCondition of winnigArray) {
    if (winCondition.every((num) => playersMoves.includes(num))) {
      return true;
    }
  }
  return false;
};

wss.on("connection", (ws) => {
  ws.on("error", () => {
    console.log("Error occured");
  });

  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());
    if (data.type === "create") {
      const playerId = createRandomId(6);
      const gameId = createRandomId(8);

      const player = new TicTacPlayer(playerId, [], true, "X");
      const game = new TicTacGame([player], gameId, []);

      games.push(game);
      player.setWebsocket(ws);
      ws.send(JSON.stringify({ gameId, playerId }));
    } else if (data.type === "join") {
      console.log("Join request");
      console.log(data.gameId);

      const game = games.find((game) => {
        console.log(game.gameId);
        return game.gameId === data.gameId;
      });

      if (!game) {
        return ws.send(
          JSON.stringify({ message: "No room with given id found" })
        );
      }

      const isTurn = !game?.players[0].isTurn;
      const playinSign = game?.players[0].playingSign === "X" ? "O" : "X";
      const playerId = createRandomId(6);
      const player = new TicTacPlayer(playerId, [], isTurn, playinSign);
      game?.players.push(player);
      player.setWebsocket(ws);
      const gameId = game?.gameId;
      ws.send(JSON.stringify({ gameId, playerId }));
    } else if (data.type === "move") {
      const { playerId } = data;
      const { gameId } = data;
      const { move } = data;
      // this function checks whether player and game exits or not and they are related or not
      if (!isValidGame(gameId, playerId, games)) {
        return ws.send(JSON.stringify({ message: "Invalid credentials" }));
      }
      const game = games.find((game) => game.gameId === gameId);

      // is the turn of that user who have send the move??
      const player = game?.players.find(
        (player) => player.playerId === playerId
      );
      if (!player?.isTurn) {
        return ws.send(JSON.stringify({ messege: "Its not your turn" }));
      }

      // lets check here is move vaild or not
      const isNotValidMove = game?.moves.includes(move);
      if (isNotValidMove) {
        return ws.send(JSON.stringify({ message: "Invalid move" }));
      }

      player.moves.push(move);
      game?.moves.push(move);
      const updatedMoves = game?.moves;
      let result : string;
      if (checkWin(player.moves)) {
        result = `${player.playerId} ${player.playingSign} Won the game`;
      } else {
        if (game?.moves.length === 9) {
          result = "Draw";
        }
        result = "Still playing";
      }
      game?.players.forEach((player) => {
        const playerWs = player.ws;
        if (player.playerId === playerId) {
          player.isTurn = false;
        } else {
          player.isTurn = true;
        }
        playerWs?.send(
          JSON.stringify({
            type: "gameUpdate",
            updatedMoves,
            result,
          })
        );
      });

      ws.send(JSON.stringify({ gamsArray: game?.moves }));
    }
  });

  ws.on("close", () => {
    console.log("connection closed");
  });
});
