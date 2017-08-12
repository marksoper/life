import { createNewBoard, resizeBoard, setCells } from '../life';

it('resizeBoard returns original board when dims overlap live cells', () => {
  const b = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  setCells(b, caretCells, 1);
  const newBoard = resizeBoard(b, 6, 6);
  expect(newBoard).toEqual(b);
  // expect(b).toEqual(expect.arrayContaining(newBoard));
});
