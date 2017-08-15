import { createNewBoard, setCells, step } from '../life';

it('step board returns a new board with right dimensions', () => {
  const bEmpty = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  const b = setCells(bEmpty, caretCells, 1);
  const stepResults = step(b);
  expect(stepResults.board.length).toBe(8);
  expect(stepResults.board[0].length).toBe(12);
  expect(stepResults.minBoardWidth).toBe(7);
  expect(stepResults.minBoardHeight).toBe(7);
});
