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
  const newBoard = [];
  for (let r = 0; r < board.length; r += 1) {
    newBoard[r] = [];
    for (let c = 0; c < board[0].length; c += 1) {
      newBoard[r][c] = board[r][c];
    }
  }
  return newBoard;
}

export function resizeBoard(board, w, h) {
  const newBoard = [];
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[0].length; c += 1) {
      const cellVal = board[r][c];
      if (c >= w || r >= h) {
        if (cellVal) {
          //
          // if resize will eliminate a live value,
          // then halt and return false
          //
          return false;
        }
      } else {
        newBoard[r] = newBoard[r] || [];
        newBoard[r][c] = board[r][c];
      }
    }
  }
  return newBoard;
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

export function setCells(board, cells, value) {
  const updatedBoard = board;
  if (value !== 0 && value !== 1) {
    throw Error('value must be 0 or 1');
  }
  cells.forEach(cell => {
    if (cell[0] > board.length || cell[1] > board[0].length) {
      throw Error(`cell index not valid: ${cell}`);
    }
    updatedBoard[cell[0]][cell[1]] = value;
  });
  return updatedBoard;
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
    }
  }
  return cellChangeCount > 0 ? nextBoard : false;
}
