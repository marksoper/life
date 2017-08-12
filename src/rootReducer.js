import { combineReducers } from 'redux';
import { createNewBoard, step, cloneBoard } from './life/life';
import { actionTypes } from './actions';
import { initialLiveCells } from './settings';

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
  if (state.generation === 0) {
    nextState.initialBoard = cloneBoard(state.board);
  }
  return nextState;
}

function toggleCellStartValueNextState(state, r, c) {
  const updatedBoard = state.board;
  updatedBoard[r][c] = updatedBoard[r][c] ? 0 : 1;
  return {
    board: updatedBoard
  };
}

function life(state = {}, action) {
  switch (action.type) {
    case actionTypes.RESET_BOARD:
      return Object.assign({}, state, {
        board:
          state.initialBoard ||
          createNewBoard(action.width, action.height, initialLiveCells),
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
      return Object.assign(
        {},
        state,
        toggleCellStartValueNextState(state, action.r, action.c)
      );
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  life
});

export default rootReducer;
