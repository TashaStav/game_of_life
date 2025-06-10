import { Cell, Field } from './types.js';

export function createEmptyField(rows: number, cols: number): Field {
  const field: Field = [];
  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    field.push(row);
  }
  return field;
}
