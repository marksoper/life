import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { createNewBoard, getMinimumAllowableDimensions } from './life/life';
import {
  initialBoardWidth,
  initialBoardHeight,
  initialLiveCells,
  minBoardWidth,
  minBoardHeight
} from './settings';

const initialBoard = createNewBoard(
  initialBoardWidth,
  initialBoardHeight,
  initialLiveCells
);

const minDims = getMinimumAllowableDimensions(initialBoard);
const mbw = Math.max(minDims[0], minBoardWidth);
const mbh = Math.max(minDims[1], minBoardHeight);

const initialState = {
  life: {
    board: initialBoard,
    minBoardWidth: mbw,
    minBoardHeight: mbh,
    generation: 0,
    isPlaying: false,
    isConcluded: false
  }
};

const store = createStore(rootReducer, initialState);

export default store;
