import { combineReducers } from 'redux';
import { createNewBoard, step } from './life/life';
import { actionTypes } from './actions';
import {
  initialBoardWidth,
  initialBoardHeight,
  initialLiveCells
} from './settings';

function stepNextState(state) {
  const nextBoard = step(state.board);
  const nextState = nextBoard
    ? {
        board: nextBoard
      }
    : {
        isConcluded: true,
        isPlaying: false
      };
  return nextState;
}

function life(state = {}, action) {
  switch (action.type) {
    case actionTypes.RESET_BOARD:
      return Object.assign({}, state, {
        board: createNewBoard(
          initialBoardWidth,
          initialBoardHeight,
          initialLiveCells
        ),
        isConcluded: false
      });
    case actionTypes.PLAY:
      return Object.assign({}, state, {
        isPlaying: true
      });
    case actionTypes.STEP:
      return Object.assign({}, state, stepNextState(state));
    case actionTypes.TOGGLE_CELL_START_VALUE:
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  life
});

export default rootReducer;
