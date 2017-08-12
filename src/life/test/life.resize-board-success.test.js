import { createNewBoard, resizeBoard, setCells } from '../life';

it('resizeBoard returns board with given dims when dims do not overlap live cells', () => {
  const b = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  setCells(b, caretCells, 1);
  const newBoard = resizeBoard(b, 7, 7);
  const newBoardExpected = createNewBoard(7, 7);
  setCells(newBoardExpected, caretCells, 1);
  expect(newBoardExpected).toEqual(expect.arrayContaining(newBoard));
});
