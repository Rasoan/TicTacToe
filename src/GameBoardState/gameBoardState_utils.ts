import {DIRECTION, ICoordinate, ORIENTATION, PLAYER, WINNER} from "./declaration/GameBoardState";

export function _getDefaultBordValues(size: number) {
    return new Array(size).fill(Array(size).fill(PLAYER._VOID_));
}

export function _togglePlayer(playerWalks: PLAYER) {
    switch (playerWalks) {
        case PLAYER.X: {
            return PLAYER.O;
        }
        case PLAYER.O: {
            return PLAYER.X;
        }
        default: {
            throw new Error('Unknown player mark!');
        }
    }
}

export function _normalizeCoordinate(coordinate: ICoordinate) {
    return {x: coordinate.x - 1, y: coordinate.y - 1}
}

export function _playerToWinner(playerWalks: PLAYER): WINNER.PLAYER_X | WINNER.PLAYER_O {
    if (playerWalks === PLAYER.X) {
        return WINNER.PLAYER_X;
    }
    if (playerWalks === PLAYER.O) {
        return WINNER.PLAYER_O;
    }

    throw new Error('Player not defined!');
}

export function _getArrayOfCoordinatesMarksInLine(
    coordinate: ICoordinate,
    orientation: ORIENTATION,
    board: Array<PLAYER[]>,
    playerWalks: PLAYER,
) {
    let arrayOfCoordinatesMarksInLine = [];

    function _getArrayOfCoordinatesMarksInDirection(
        coordinate: ICoordinate,
        direction: DIRECTION,
        board: Array<PLAYER[]>,
        playerWalks: PLAYER,
    ): ICoordinate[] {
        const {
            x,
            y,
        } = coordinate;

        const arrayOfCoordinatesMarksInDirection = [] as ICoordinate[];

        switch (direction) {
            case DIRECTION.UP: {
                for (let currentY = y - 1; currentY >= 0; currentY--) {
                    const currentCell = board[currentY][x];
                    const currentCoordinates: ICoordinate = { x, y: currentY };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.DOWN: {
                for (let currentY = y + 1; currentY < board.length; currentY++) {
                    const currentCell = board[currentY][x];
                    const currentCoordinates: ICoordinate = { x, y: currentY };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.LEFT: {
                for (let currentX = x - 1; currentX >= 0; currentX--) {
                    const currentCell = board[y][currentX];
                    const currentCoordinates: ICoordinate = { x: currentX, y };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.RIGHT: {
                for (let currentX = x + 1; currentX < board.length; currentX++) {
                    const currentCell = board[y][currentX];
                    const currentCoordinates: ICoordinate = { x: currentX, y };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.UP_RIGHT: {
                for (let currentX = x + 1, currentY = y - 1; currentY >= 0 && currentX < board.length;) {
                    const currentCell = board[currentY][currentX];
                    const currentCoordinates: ICoordinate = { x: currentX, y: currentY };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }

                    currentX++;
                    currentY--;
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.DOWN_RIGHT: {
                for (let currentX = x + 1, currentY = y + 1; currentY < board.length && currentX < board.length;) {
                    const currentCell = board[currentY][currentX];
                    const currentCoordinates: ICoordinate = { x: currentX, y: currentY };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }

                    currentX++;
                    currentY++;
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.UP_LEFT: {
                for (let currentX = x - 1, currentY = y - 1; currentY >= 0 && currentX >= 0;) {
                    const currentCell = board[currentY][currentX];
                    const currentCoordinates: ICoordinate = { x: currentX, y: currentY };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }

                    currentX--;
                    currentY--;
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            case DIRECTION.DOWN_LEFT: {
                for (let currentX = x - 1, currentY = y + 1; currentY < board.length && currentX >= 0;) {
                    const currentCell = board[currentY][currentX];
                    const currentCoordinates: ICoordinate = { x: currentX, y: currentY };

                    if (currentCell === playerWalks) {
                        arrayOfCoordinatesMarksInDirection.push(currentCoordinates);
                    }
                    else {
                        return arrayOfCoordinatesMarksInDirection;
                    }

                    currentX--;
                    currentY++;
                }

                return arrayOfCoordinatesMarksInDirection;
            }
            default: {
                throw new Error('Direction is no found!');
            }
        }
    }

    switch (orientation) {
        case ORIENTATION.VERTICAL: {
            const arrayOfCoordinatesMarksInDirection_up = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.UP,
                board,
                playerWalks,
            );
            const arrayOfCoordinatesMarksInDirection_down = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.DOWN,
                board,
                playerWalks,
            );

            arrayOfCoordinatesMarksInLine = [
                coordinate,
                ...arrayOfCoordinatesMarksInDirection_up,
                ...arrayOfCoordinatesMarksInDirection_down,
            ];

            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.VERTICAL,
            );

            break;
        }
        case ORIENTATION.HORIZONTAL: {
            const arrayOfCoordinatesMarksInDirection_right = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.RIGHT,
                board,
                playerWalks,
            );
            const arrayOfCoordinatesMarksInDirection_left = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.LEFT,
                board,
                playerWalks,
            );

            arrayOfCoordinatesMarksInLine = [
                coordinate,
                ...arrayOfCoordinatesMarksInDirection_right,
                ...arrayOfCoordinatesMarksInDirection_left,
            ];

            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.HORIZONTAL,
            );

            break;
        }
        case ORIENTATION.DIAGONAL_RIGHT: {
            const arrayOfCoordinatesMarksInDirection_upRight = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.UP_RIGHT,
                board,
                playerWalks,
            );
            const arrayOfCoordinatesMarksInDirection_downLeft = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.DOWN_LEFT,
                board,
                playerWalks,
            );

            arrayOfCoordinatesMarksInLine = [
                coordinate,
                ...arrayOfCoordinatesMarksInDirection_upRight,
                ...arrayOfCoordinatesMarksInDirection_downLeft,
            ];

            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.DIAGONAL_RIGHT,
            );

            break;
        }
        case ORIENTATION.DIAGONAL_LEFT: {
            const arrayOfCoordinatesMarksInDirection_upLeft = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.UP_LEFT,
                board,
                playerWalks,
            );
            const arrayOfCoordinatesMarksInDirection_downRight = _getArrayOfCoordinatesMarksInDirection(
                coordinate,
                DIRECTION.DOWN_RIGHT,
                board,
                playerWalks,
            );

            arrayOfCoordinatesMarksInLine = [
                coordinate,
                ...arrayOfCoordinatesMarksInDirection_upLeft,
                ...arrayOfCoordinatesMarksInDirection_downRight,
            ];

            arrayOfCoordinatesMarksInLine = _sortArrayOfCoordinatesMarksForOrientationLine(
                arrayOfCoordinatesMarksInLine,
                ORIENTATION.DIAGONAL_LEFT,
            );

            break;
        }
        default: {
            throw new Error('ORIENTATION is not found!');
        }
    }

    return arrayOfCoordinatesMarksInLine;
}

export function _checkIsValidCoordinate(coordinate: ICoordinate, sizeBoard: number): boolean {
    const {
        x,
        y,
    } = coordinate;

    return y > 0 && x > 0 && y <= sizeBoard && x <= sizeBoard;
}

export function _checkIsCanMovie(countSteps: number, sizeBoard: number): boolean {
    return countSteps < sizeBoard;
}

export function _checkIsValidBoardFormat(gameBoard: Array<Array<string>>) {
    for (const currentRow of gameBoard) {
        if (currentRow.length !== gameBoard.length) {
            return false;
        }

        for (const markCurrentCell of currentRow) {
            const isValidMark = _checkIsValidMark(markCurrentCell);

            if (!isValidMark) {
                return false;
            }
        }
    }

    return true;
}

export function _checkIsValidMark(mark: string): boolean {
    return mark === PLAYER.X || mark === PLAYER.O || mark === PLAYER._VOID_;
}

export function _checkIsNotAlreadyMarkedCell(markCell: PLAYER) {
    return markCell === PLAYER._VOID_;
}

export function _sortArrayOfCoordinatesMarksForOrientationLine(arrayOfCoordinates: ICoordinate[], orientationLine: ORIENTATION) {
    if (orientationLine === ORIENTATION.HORIZONTAL) {
        return arrayOfCoordinates.sort((prevCoordinate, nextCoordinate) => prevCoordinate.x - nextCoordinate.x);
    }

    return arrayOfCoordinates.sort((prevCoordinate, nextCoordinate) => prevCoordinate.y - nextCoordinate.y);
}