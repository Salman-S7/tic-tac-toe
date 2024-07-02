import { TicTacGame } from "../tic-tac-toe/TicTacGame";

export const createRandomId = (idLength: number): string => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += letters.at(Math.floor(Math.random() * letters.length));
  }
  return id;
};

export const isValidGame = (
  gameId: string,
  playerId: string,
  games: TicTacGame[]
) => {
    const game = games.find(game => {
        return game.gameId === gameId
    })
    if (!game) {
        return false;
    }
    const player = game?.players.find(player => {
        return player.playerId === playerId
    })
    if (!player) {
        return false;
    }
    return true;
};
