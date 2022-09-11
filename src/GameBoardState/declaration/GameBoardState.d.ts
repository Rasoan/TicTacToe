export interface IGameBoardStateOptions {
    size?: number;
    board?: Array<PLAYER[]>;
    firstPlayerWalks?: PLAYER.X | PLAYER.O;
    playerWalks?: PLAYER.X | PLAYER.O;
    winningStreak?: number;
    winnerInformation?: IWinnerInformation;
}

export interface IWinnerInformation {
    winner: WINNER;
    winningLine?: ICoordinate[];
    winnerDirectionLine?: ORIENTATION;
}

export type IRequiredWinnerInformation = Required<IWinnerInformation>;

export interface ICoordinate {
    x: number;
    y: number;
}

export interface IMarkInformation {
    playerWalks: PLAYER.X | PLAYER.O;
}

export const enum PLAYER {
    _VOID_ = '',
    X = 'x',
    O = 'o',
}

export const enum WINNER {
    _UNKNOWN_ = 0,
    PLAYER_X = 1,
    PLAYER_O = 2,
    DRAW = 3,
}

export const enum COORDINATE {
    X = 'x',
    Y = 'y',
}

export const enum DIRECTION {
    UP = 1,
    DOWN = 2,
    RIGHT = 3,
    LEFT = 4,
    UP_RIGHT = 5,
    DOWN_RIGHT = 6,
    DOWN_LEFT = 8,
    UP_LEFT = 7,
}

export const enum ORIENTATION {
    _UNKNOWN_ = 0,
    VERTICAL = 1,
    HORIZONTAL = 2,
    DIAGONAL_RIGHT = 3,
    DIAGONAL_LEFT = 4,
}
