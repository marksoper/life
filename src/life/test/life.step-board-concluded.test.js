import { createNewBoard, step } from '../life';

it('step board returns false when the board does not change', () => {
  const b = createNewBoard(12, 8);
  const newb = step(b);
  expect(newb).toBe(false);
});
