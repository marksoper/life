import { createNewBoard, cloneBoard, setCells } from '../life';

it('cloneBoard produces the same board', () => {
  const b = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  setCells(b, caretCells, 1);
  const newBoard = cloneBoard(b);
  expect(b).toEqual(expect.arrayContaining(newBoard));
});
