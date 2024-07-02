import { WebSocket } from "ws";
export class TicTacPlayer{
    playerId: string | null;
    moves: string[];
    isTurn: boolean;
    playingSign: "X" | "O";
    ws: WebSocket | null = null;
    constructor(playerId : string | null, moves: string[], isTurn: boolean, playinSign: "X" | "O") {
        this.playerId = playerId;
        this.moves = moves;
        this.isTurn = isTurn;
        this.playingSign = playinSign;
    }
    setIsTurn(isTurn : boolean) {
        this.isTurn = isTurn;
    }
    setMoves(moves: string[]) {
        this.moves = moves;
    }
    setWebsocket(ws: WebSocket) {
        this.ws = ws;
    }

}