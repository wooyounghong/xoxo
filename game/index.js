import { Map } from 'immutable';

export default function reducer(
  state = { board: new Map(), turn: 'X' },
  action
) {
  switch (action.type) {
    case 'MOVE':
      let newBoard = state.board.setIn(action.position, action.turn);
      // do we need action.turn?
      let winnerFunc = winner(newBoard);
      console.log(winnerFunc);
      return state.turn === 'X'
        ? { board: newBoard, turn: 'O', winner: winnerFunc }
        : { board: newBoard, turn: 'X', winner: winnerFunc };
    default:
      return state;
  }
}

export const move = (turn, pos) => {
  return { type: 'MOVE', position: pos, turn };
};

export const streak = (board, firstCoord, ...remainingCoords) => {
  // remainingCoords = [[1, 1], [2,2]]
  // if (!board[firstCoord[0]] || !board[firstCoord[0]][firstCoord[1]]) {
  //   console.log(board);
  //   console.log(firstCoord);
  //   console.log(typeof firstCoord[0]);
  //   console.log(board.getIn(firstCoord));
  //   console.log('first');
  //   return undefined;
  // }
  const value1 = board.getIn(firstCoord);
  const triple = remainingCoords.every(coords => {
    return board.getIn(coords) === value1;
  });
  if (triple) return value1;
  return undefined;
};

export const winner = board => {
  const win = '';
  return (
    streak(board, [0, 0], [0, 1], [0, 2]) ||
    streak(board, [1, 0], [1, 1], [1, 2]) ||
    streak(board, [2, 0], [2, 1], [2, 2]) ||
    streak(board, [0, 0], [1, 0], [2, 0]) ||
    streak(board, [0, 1], [1, 1], [2, 1]) ||
    streak(board, [0, 2], [1, 2], [2, 2]) ||
    streak(board, [0, 0], [1, 1], [2, 2]) ||
    streak(board, [2, 0], [1, 1], [0, 2]) ||
    checkEmpty(board)
  );
};

// checker function if no winner found yet;
const checkEmpty = board => {
  if (
    !board.hasIn([0, 0]) ||
    !board.hasIn([0, 1]) ||
    !board.hasIn([0, 2]) ||
    !board.hasIn([1, 0]) ||
    !board.hasIn([1, 1]) ||
    !board.hasIn([1, 2]) ||
    !board.hasIn([2, 0]) ||
    !board.hasIn([2, 1]) ||
    !board.hasIn([2, 2])
  ) {
    return 'not finished yet';
  }
  return 'draw';
};
