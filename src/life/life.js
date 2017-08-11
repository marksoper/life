
function initializeMatrix(w, h) {
  let matrix = [];
  let r = 0;
  while (r < h) {
    matrix[r] = [];
    let c = 0;
    while (c < w) {
      matrix[r][c] = 0;
      c+=1;
    }
    r+=1;
  }
  return matrix;
}

export function createNewBoard(w, h, liveCells) {
  let newBoard = initializeMatrix(w, h);
  if (liveCells) {
    setCells(newBoard, liveCells, 1);
  }
  return newBoard;
}

export function setCells(board, cells, value) {
  if (value !== 0 && value !== 1) {
    throw Error('value must be 0 or 1');
  }
  cells.forEach((cell) => {
    if (cell[0] > board.length || cell[1] > board[0].length) {
      throw Error(`cell index not valid: ${cell}`);
    }
    board[cell[0]][cell[1]] = value;
  });
}

function getLiveNeighborCount(r, c, board) {
  let lnc = 0;
  for (let r_i = r - 1; r_i <= r + 1; r_i++) {
    for (let c_i = c - 1; c_i <= c + 1; c_i++) {
      if (
        (r_i !== r || c_i !== c) &&
        r_i >= 0 && r_i < board.length &&
        board[r_i][c_i]
      ) {
        lnc += 1;
      }
    }
  }
  return lnc;
}

export function step(board) {
  let nextBoard = [];
  let cellChangeCount = 0;
  for (let r = 0; r < board.length; r++) {
    nextBoard[r] = [];
    for (let c = 0; c < board[0].length; c++) {
      const isLive = board[r][c];
      let nextVal = isLive;
      const lnc = getLiveNeighborCount(r, c, board);
      if (isLive && (lnc < 2 || lnc > 3)) {
        nextVal = 0;
        cellChangeCount += 1;
      }
      if (!isLive && lnc === 3) {
        nextVal = 1;
        cellChangeCount += 1;
      }
      nextBoard[r][c] = nextVal;
    }
  }
  return cellChangeCount > 0 ? nextBoard : false;
}
