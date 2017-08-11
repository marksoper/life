const RESET_BOARD = 'RESET_BOARD';
const STEP = 'STEP';
const TOGGLE_CELL_START_VALUE = 'TOGGLE_CELL_START_VALUE';

export const actionTypes = {
  RESET_BOARD,
  STEP,
  TOGGLE_CELL_START_VALUE
};

export function resetBoard(width, height) {
  return {
    type: RESET_BOARD,
    width,
    height
  };
}

export function step() {
  return {
    type: STEP
  };
}

export function toggleCellStartValue(r, c) {
  return {
    type: TOGGLE_CELL_START_VALUE,
    r,
    c
  };
}