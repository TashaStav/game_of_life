import { createRandomField } from './gameField.js';

describe('createRandomField', () => {
  it('should create a random array with a given number of rows and columns', () => {
    const rows = 10;
    const cols = 10;

    const field1 = createRandomField(rows, cols);
    const field2 = createRandomField(rows, cols);

    let isDifferent = false;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (field1[i][j] !== field2[i][j]) {
          isDifferent = true;
          break;
        }
      }
      if (isDifferent) break;
    }

    expect(isDifferent).toBe(true);
  });
});
