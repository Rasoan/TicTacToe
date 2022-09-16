import type { ICoordinate, IGameBoardStateOptions, IWinnerInformation } from "./declaration/GameBoardState";
import { IMarkInformation, PLAYER } from "./declaration/GameBoardState";
export default class GameBoardState {
    private _board;
    private _playerWalks;
    private _winnerInformation;
    private _winningStreak;
    private _firstPlayerWalks;
    private _handleEndGame;
    subscribeToEndGame(collback: (winnerInformation: IWinnerInformation) => void): void;
    constructor(options?: IGameBoardStateOptions);
    get board(): PLAYER[][];
    get countSteps(): number;
    get playerWalks(): PLAYER.X | PLAYER.O;
    get winningStreak(): number;
    get winnerInformation(): IWinnerInformation;
    get firstPlayerWalks(): PLAYER.X | PLAYER.O;
    get size(): number;
    get numberOfMoves(): number;
    addMark(coordinate: ICoordinate): IMarkInformation | void;
    private _checkForVictory;
    private _fillWinnerInformation;
    restartGame(): void;
    start(options?: IGameBoardStateOptions): void;
    resetStatistics(): void;
    toJSON(): string;
    static fromJSON(gameBoardStateJSON: string): GameBoardState;
}
