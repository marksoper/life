import { createNewBoard, setCells, step } from '../life';

it('step board returns a new board with right dimensions', () => {
  const b = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  setCells(b, caretCells, 1);
  const newb = step(b);
  expect(newb.length).toBe(8);
  expect(newb[0].length).toBe(12);
});
