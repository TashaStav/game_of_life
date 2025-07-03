import { Cell, Field } from './types.js';
import { createEmptyField } from './gameField.js';

export function countAliveNeighbors(
  field: Field,
  x: number,
  y: number,
): number {
  const rows = field.length;
  const cols = field[0].length;
  let count = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        if (field[newX][newY] === 1) {
          count++;
        }
      }
    }
  }
  return count;
}

export function getNextGeneration(field: Field): Field {
  const rows = field.length;
  const cols = field[0].length;

  const newField = createEmptyField(rows, cols);
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const aliveNeighbor = countAliveNeighbors(field, x, y);
      const cell: Cell = field[x][y];

      if (cell === 1) {
        newField[x][y] = aliveNeighbor === 2 || aliveNeighbor === 3 ? 1 : 0;
      } else {
        newField[x][y] = aliveNeighbor === 3 ? 1 : 0;
      }
    }
  }
  return newField;
}

export function areFieldEqual(
  fieldOne: number[][],
  fieldTwo: number[][],
): boolean {
  return fieldOne.every((row, x) =>
    row.every((cell, y) => cell === fieldTwo[x][y]),
  );
}
