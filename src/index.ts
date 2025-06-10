import { createEmptyField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration } from './game.js';

let field = createEmptyField(30, 30);

const container = document.querySelector('.field') as HTMLDivElement;
renderField(field, container);

container.addEventListener('click', (e) => {
  const target = e.target as HTMLDivElement;

  if (!target.classList.contains('cell')) return;

  const x = Number(target.dataset.x);
  const y = Number(target.dataset.y);

  field[y][x] = field[y][x] === 1 ? 0 : 1;

  renderField(field, container);
});

function step(): void {
  field = getNextGeneration(field);
  renderField(field, container);
}

const stepBtn = document.querySelector('.step-btn') as HTMLButtonElement;
stepBtn.addEventListener('click', step);
