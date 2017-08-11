import { createNewBoard } from '../life';

it('creates new board with right size', () => {
  const b = createNewBoard(1000, 800);
  expect(b.length).toBe(800);
  expect(b[0].length).toBe(1000);
});
