import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { createNewBoard, getMinimumAllowableDimensions } from './life/life';
import config from './config';

const initialBoard = createNewBoard(
  config.INITIAL_BOARD_WIDTH,
  config.INITIAL_BOARD_HEIGHT,
  config.INITIAL_LIVE_CELLS
);

const minDims = getMinimumAllowableDimensions(initialBoard);
const minbw = Math.max(minDims[0], config.INITIAL_MIN_BOARD_WIDTH);
const minbh = Math.max(minDims[1], config.INITIAL_MIN_BOARD_HEIGHT);

const initialState = {
  life: {
    board: initialBoard,
    minBoardWidth: minbw,
    minBoardHeight: minbh,
    maxBoardWidth: config.INITIAL_MAX_BOARD_WIDTH,
    maxBoardHeight: config.INITIAL_MAX_BOARD_HEIGHT,
    tickDelay: config.INITIAL_TICK_DELAY,
    generation: 0,
    isPlaying: false,
    isConcluded: false
  }
};

const store = createStore(rootReducer, initialState);

export default store;
