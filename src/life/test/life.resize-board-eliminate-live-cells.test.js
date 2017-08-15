import { createNewBoard, resizeBoard, setCells } from '../life';

it('resizeBoard returns false when requested dims eliminate live cells', () => {
  const bOrig = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  const b = setCells(bOrig, caretCells, 1);
  const newBoard = resizeBoard(b, 6, 6);
  expect(newBoard).toBe(false);
});
