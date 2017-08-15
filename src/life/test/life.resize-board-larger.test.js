import { createNewBoard, resizeBoard, setCells } from '../life';

it('resizeBoard returns board with given dims when dims do not overlap live cells', () => {
  const bOrig = createNewBoard(12, 8);
  const caretCells = [[4, 5], [5, 4], [5, 5], [6, 6]];
  const b = setCells(bOrig, caretCells, 1);
  const newBoard = resizeBoard(b, 14, 7);
  const newBoardExpected = setCells(createNewBoard(14, 7), caretCells, 1);
  expect(newBoardExpected).toEqual(expect.arrayContaining(newBoard));
});
