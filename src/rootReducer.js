import { combineReducers } from 'redux';
import {
  createNewBoard,
  step,
  cloneBoard,
  resizeBoard,
  setCells,
  getMinimumAllowableDimensions
} from './life/life';
import { actionTypes } from './actions';
import {
  initialLiveCells,
  minBoardWidth,
  minBoardHeight,
  maxBoardWidth,
  maxBoardHeight
} from './settings';

function stepNextState(state) {
  if (state.isConcluded) {
    return state;
  }
  const nextGeneration = state.generation + 1;
  const nextBoardResults = step(state.board);
  if (!nextBoardResults) {
    return {
      generation: nextGeneration,
      isConcluded: true,
      isPlaying: false
    };
  }
  const nextState = {
    board: nextBoardResults.board,
    minBoardWidth: nextBoardResults.minBoardWidth,
    minBoardHeight: nextBoardResults.minBoardHeight,
    generation: nextGeneration
  };
  if (state.generation === 0) {
    nextState.initialBoard = cloneBoard(state.board);
  }
  return nextState;
}

function toggleCellStartValueNextState(state, r, c) {
  const currVal = state.board[r][c];
  const nextVal = currVal ? 0 : 1;
  const nextBoard = setCells(state.board, [[r, c]], nextVal);
  const minDims = getMinimumAllowableDimensions(nextBoard);
  return {
    board: nextBoard,
    minBoardWidth: minDims[0],
    minBoardHeight: minDims[1]
  };
}

function resizeBoardNextState(state, w, h) {
  if (
    w >= minBoardWidth &&
    w <= maxBoardWidth &&
    h >= minBoardHeight &&
    h <= maxBoardHeight
  ) {
    const newBoard = resizeBoard(state.board, w, h);
    return newBoard ? { board: newBoard } : {};
  }
  return {};
}

function life(state = {}, action) {
  switch (action.type) {
    case actionTypes.RESET_BOARD:
      return Object.assign({}, state, {
        board:
          state.initialBoard ||
          createNewBoard(
            state.board[0].length,
            state.board.length,
            initialLiveCells
          ),
        generation: 0,
        isPlaying: false,
        isConcluded: false
      });
    case actionTypes.RESIZE_BOARD:
      return Object.assign(
        {},
        state,
        resizeBoardNextState(state, action.width, action.height)
      );
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
