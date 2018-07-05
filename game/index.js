import { Map } from 'immutable';

export default function reducer(
  state = { board: new Map(), turn: 'X' },
  action
) {
  switch (action.type) {
    case 'MOVE':
      let newBoard = state.board.setIn(action.position, action.turn);
      // do we need action.turn?
      return state.turn === 'X'
        ? { board: newBoard, turn: 'O' }
        : { board: newBoard, turn: 'X' };
    default:
      return state;
  }
}

export const move = (turn, pos) => {
  return { type: 'MOVE', position: [pos[0], pos[1]], turn };
};
