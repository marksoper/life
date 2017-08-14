import { createNewBoard, setCells, step } from '../life';

it('step board returns a new board with right dimensions', () => {
  const b = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  setCells(b, caretCells, 1);
  const { board, minBoardWidth, minBoardHeight } = step(b);
  expect(board.length).toBe(8);
  expect(board[0].length).toBe(12);
  expect(minBoardWidth).toBe(7);
  expect(minBoardHeight).toBe(7);
});
