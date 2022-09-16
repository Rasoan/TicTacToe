import { ICoordinate, ORIENTATION, PLAYER, WINNER } from "./declaration/GameBoardState";
export declare function _getDefaultBordValues(size: number): any[];
export declare function _togglePlayer(playerWalks: PLAYER): PLAYER.X | PLAYER.O;
export declare function _normalizeCoordinate(coordinate: ICoordinate): {
    x: number;
    y: number;
};
export declare function _playerToWinner(playerWalks: PLAYER): WINNER.PLAYER_X | WINNER.PLAYER_O;
export declare function _getArrayOfCoordinatesMarksInLine(coordinate: ICoordinate, orientation: ORIENTATION, board: Array<PLAYER[]>, playerWalks: PLAYER): ICoordinate[];
export declare function _checkIsValidCoordinate(coordinate: ICoordinate, sizeBoard: number): boolean;
export declare function _checkIsCanMovie(countSteps: number, sizeBoard: number): boolean;
export declare function _checkIsValidBoardFormat(gameBoard: Array<Array<string>>): boolean;
export declare function _checkIsValidMark(mark: string): boolean;
export declare function _checkIsNotAlreadyMarkedCell(markCell: PLAYER): boolean;
export declare function _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinates: ICoordinate[], orientationLine: ORIENTATION): ICoordinate[];
