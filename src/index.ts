import { createEmptyField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration } from './game.js';

let field = createEmptyField(25, 25);

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

let speed = 500;
let intervalId: number | null = null;

function changeSpeed(newSpeed: number) {
  speed = 1100 - newSpeed * 100;
  if (intervalId !== null) {
    stopGame();
    startGame();
  }
}

function setupSpeedControl(): void {
  const speedInput = document.querySelector('.speed') as HTMLInputElement;
  changeSpeed(Number(speedInput.value));

  speedInput.addEventListener('input', () => {
    changeSpeed(Number(speedInput.value));
  });
}

setupSpeedControl();

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
    }, speed);
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

const widthInput = document.querySelector('.width-input') as HTMLInputElement;
const heightInput = document.querySelector('.height-input') as HTMLInputElement;
const resizeBtn = document.querySelector('.size-btn') as HTMLButtonElement;

function resizeField() {
  const newWidth = Number(widthInput.value);
  const newHeight = Number(heightInput.value);

  stopGame();
  field = createEmptyField(newHeight, newWidth);
  renderField(field, container);
}

resizeBtn.addEventListener('click', resizeField);
