import { TicTacPlayer } from "./TicTacPlayer";
export class TicTacGame {
  players: TicTacPlayer[];
    gameId: string;
    moves: string[];
    // result: string = "";
  constructor(players: TicTacPlayer[], gameId: string, moves : string[]) {
    this.players = players;
      this.gameId = gameId;
      this.moves = moves;
  }
}