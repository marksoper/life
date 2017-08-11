import { createNewBoard } from '../life';

it('creates new board with right default values of 0 for every cell', () => {
  const b = createNewBoard(3, 3);
  expect([[0, 0, 0], [0, 0, 0], [0, 0, 0]]).toEqual(expect.arrayContaining(b));
});
