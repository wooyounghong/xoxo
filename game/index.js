import { Map } from 'immutable';

export default function reducer(
  state = { board: new Map(), turn: 'X' },
  action
) {
  switch (action.type) {
    case 'MOVE':
      if (bad(state, action)) {
        return  Object.assign({}, state, {error: bad(state, action)})
      }
      const newTurn = turnReducer(action.turn);

      let newBoard = state.board.setIn(action.position, action.turn);
      // do we need action.turn?
      let winnerFunc = winner(newBoard);
      // console.log(winnerFunc);
      return {board: newBoard, turn: newTurn, winner: winnerFunc } 
    default:
      return state;
  }
};


function bad(state, action) {
  if (state.board.hasIn(action.position)) {
    return 'spot taken';
  } else if ((0 > action.position[0] == action.position[0] > 2) && (0 > action.position[1] == action.position[1] > 2)) {
    return false;
  } else {
    return 'spot is off the board'
  }
}


function turnReducer(turn='X') {
  return turn === 'X' ? 'O' : 'X';
}





export const move = (turn, pos) => {
  return { type: 'MOVE', position: pos, turn };
};

export const streak = (board, firstCoord, ...remainingCoords) => {
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
