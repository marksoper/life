function initializeMatrix(w, h) {
  const matrix = [];
  let r = 0;
  while (r < h) {
    matrix[r] = [];
    let c = 0;
    while (c < w) {
      matrix[r][c] = 0;
      c += 1;
    }
    r += 1;
  }
  return matrix;
}

export function createNewBoard(w, h, liveCells) {
  let newBoard = initializeMatrix(w, h);
  if (liveCells) {
    newBoard = setCells(newBoard, liveCells, 1);
  }
  return newBoard;
}

export function cloneBoard(board) {
  const nextBoard = [];
  for (let r = 0; r < board.length; r += 1) {
    nextBoard[r] = [];
    for (let c = 0; c < board[0].length; c += 1) {
      nextBoard[r][c] = board[r][c];
    }
  }
  return nextBoard;
}

export function resizeBoard(board, w, h) {
  const nextBoard = [];
  const wLimit = Math.max(board[0].length, w);
  const hLimit = Math.max(board.length, h);
  for (let r = 0; r < hLimit; r += 1) {
    for (let c = 0; c < wLimit; c += 1) {
      let cellVal;
      if (r < board.length && r < h && c < board[0].length && c < w) {
        cellVal = board[r][c];
      } else if (
        (r >= h && r < board.length) ||
        (c >= w && c < board[0].length)
      ) {
        if (board[r][c]) {
          return false;
        }
      } else if (
        (r >= board.length && r < h) ||
        (c >= board[0].length && c < w)
      ) {
        cellVal = 0;
      }
      if (cellVal === 0 || cellVal === 1) {
        nextBoard[r] = nextBoard[r] || [];
        nextBoard[r][c] = cellVal;
      }
    }
  }
  return nextBoard;
}

//
// how small can the board be made without
// eliminating any live cells
//
export function getMinimumAllowableDimensions(board) {
  let rMax = 0;
  let cMax = 0;
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[0].length; c += 1) {
      if (board[r][c] === 1) {
        rMax = Math.max(rMax, r);
        cMax = Math.max(cMax, c);
      }
    }
  }
  return [cMax + 1, rMax + 1];
}

function doesCellsContainCell(cells, r, c) {
  return cells.filter(cell => cell[0] === r && cell[1] === c).length > 0;
}

export function setCells(board, cells, value) {
  const nextBoard = [];
  if (value !== 0 && value !== 1) {
    throw Error('value must be 0 or 1');
  }
  for (let r = 0; r < board.length; r += 1) {
    nextBoard[r] = [];
    for (let c = 0; c < board[0].length; c += 1) {
      if (doesCellsContainCell(cells, r, c)) {
        nextBoard[r][c] = value;
      } else {
        nextBoard[r][c] = board[r][c];
      }
    }
  }
  return nextBoard;
}

function getLiveNeighborCount(r, c, board) {
  let lnc = 0;
  for (let rI = r - 1; rI <= r + 1; rI += 1) {
    for (let cI = c - 1; cI <= c + 1; cI += 1) {
      if (
        (rI !== r || cI !== c) &&
        rI >= 0 &&
        rI < board.length &&
        board[rI][cI]
      ) {
        lnc += 1;
      }
    }
  }
  return lnc;
}

export function step(board) {
  const nextBoard = [];
  let cellChangeCount = 0;
  let rMax = 0;
  let cMax = 0;
  for (let r = 0; r < board.length; r += 1) {
    nextBoard[r] = [];
    for (let c = 0; c < board[0].length; c += 1) {
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
      if (nextVal) {
        rMax = Math.max(rMax, r);
        cMax = Math.max(cMax, c);
      }
    }
  }
  return cellChangeCount > 0
    ? {
        board: nextBoard,
        minBoardWidth: cMax + 1,
        minBoardHeight: rMax + 1
      }
    : false;
}
