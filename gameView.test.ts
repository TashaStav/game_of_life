import { renderField } from './gameView.js';
import { Field } from './types.js';

describe('renderField', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('clears the container before rendering', () => {
    container.innerHTML = 'old content';

    const field: Field = [
      [0, 1],
      [1, 0],
    ];

    renderField(field, container);

    expect(container.innerHTML).not.toContain('old content');
  });

  it('creates the correct number of rows and cells', () => {
    const field: Field = [
      [0, 1],
      [1, 0],
      [0, 0],
    ];

    renderField(field, container);

    const rows = container.querySelectorAll('.row');
    expect(rows).toHaveLength(3);

    rows.forEach((row) => {
      const cells = row.querySelectorAll('.cell');
      expect(cells).toHaveLength(2);
    });
  });
});
