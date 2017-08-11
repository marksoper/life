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
        isConcluded: true
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
    case actionTypes.STEP:
      return Object.assign({}, state, stepNextState(state));
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  life
});

export default rootReducer;
