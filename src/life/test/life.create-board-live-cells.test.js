import { createNewBoard } from '../life';

it('creates new board with supplied liveCell values set to 1', () => {
  const liveCells = [[0, 0], [4, 2], [3, 1]];
  const b = createNewBoard(5, 6, liveCells);
  liveCells.forEach(cell => {
    expect(b[cell[0]][cell[1]]).toBe(1);
  });
});
