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
      if (winnerFunc === 'not finished yet') console.log(winnerFunc);
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
  const value1 = board[firstCoord[0]][firstCoord[1]];
  console.log(value1);
  const triple = remainingCords.every((coords) => {
    return board[coords[0]][coords[1]] === value1
  })
  if (triple) return value1;
  return undefined
};


export const winner = (board) => {
  const win = ''
  return streak(board, [0, 0], [0, 1], [0, 2]) || streak(board, [1, 0], [1, 1], [1, 2]) || streak(board, [2, 0], [2, 1], [2, 2]) || streak(board, [0, 0], [1, 0], [2, 0]) || streak(board, [0, 1], [1, 1], [2, 1]) || streak(board, [0, 2], [1, 2], [2, 2]) || streak(board, [0, 0], [1, 1], [2, 2]) || streak(board, [2, 0], [1, 1], [0, 2]) || checkEmpty(board);
}

// checker function if no winner found yet;
const checkEmpty = (board) => {
  if (board[0][0] === '_' || board[0][1] === '_' || board[0][2] === '_' || board[1][0] === '_' || board[1][1] === '_' || board[1][2] === '_' || board[2][0] === '_' || board[2][1] === '_' || board[2][2] === '_') {
    return 'not finished yet';
  }
  return 'draw';
}