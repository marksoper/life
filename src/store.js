import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { createNewBoard } from './life/life';
import {
  initialBoardWidth,
  initialBoardHeight,
  initialLiveCells
} from './settings';

const initialBoard = createNewBoard(
  initialBoardWidth,
  initialBoardHeight,
  initialLiveCells
);

const initialState = {
  life: {
    board: initialBoard,
    generation: 0,
    isPlaying: false,
    isConcluded: false
  }
};

const store = createStore(rootReducer, initialState);

export default store;
