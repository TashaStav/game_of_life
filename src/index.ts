import { createEmptyField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration } from './game.js';

let field = createEmptyField(30, 30);

const container = document.querySelector('.field') as HTMLDivElement;
const stepBtn = document.querySelector('.step-btn') as HTMLButtonElement;
const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
const stopBtn = document.querySelector('.stop-btn') as HTMLButtonElement;

renderField(field, container);

container.addEventListener('click', (e) => {
  const target = e.target as HTMLDivElement;

  if (!target.classList.contains('cell')) return;

  const x = Number(target.dataset.x);
  const y = Number(target.dataset.y);

  field[y][x] = field[y][x] === 1 ? 0 : 1;

  renderField(field, container);
});

let intervalId: number | null = null;

function step(): void {
  field = getNextGeneration(field);
  renderField(field, container);
}

stepBtn.addEventListener('click', step);

function startGame(): void {
  if (intervalId === null) {
    intervalId = window.setInterval(() => {
      field = getNextGeneration(field);
      renderField(field, container);
    }, 500);
  }
}

startBtn.addEventListener('click', startGame);

function stopGame(): void {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

stopBtn.addEventListener('click', stopGame);
