import { combineReducers } from 'redux';
import { createNewBoard, step } from './life/life';
import { actionTypes } from './actions';
import {
  initialBoardWidth,
  initialBoardHeight,
  initialLiveCells
} from './settings';

function stepNextState(state) {
  if (state.isConcluded) {
    return state;
  }
  const nextBoard = step(state.board);
  const nextGeneration = state.generation + 1;
  const nextState = nextBoard
    ? {
        board: nextBoard,
        generation: nextGeneration
      }
    : {
        generation: nextGeneration,
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
        generation: 0,
        isPlaying: false,
        isConcluded: false
      });
    case actionTypes.PLAY:
      return Object.assign({}, state, {
        isPlaying: true
      });
    case actionTypes.PAUSE:
      return Object.assign({}, state, {
        isPlaying: false
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
