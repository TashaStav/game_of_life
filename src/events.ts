import { createEmptyField, createRandomField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration } from './game.js';

export let intervalId: number | null = null;
export function init() {
  let field = createEmptyField(25, 25);

  const container = document.querySelector('.field') as HTMLDivElement;
  const stepBtn = document.querySelector('.step-btn') as HTMLButtonElement;
  const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
  const stopBtn = document.querySelector('.stop-btn') as HTMLButtonElement;
  const randomBtn = document.querySelector('.random-btn') as HTMLButtonElement;
  const clearBtn = document.querySelector('.clear-btn') as HTMLButtonElement;

  renderField(field, container);

  // Ручное изменение состояния клеток
  container.addEventListener('click', (e) => {
    const target = e.target as HTMLDivElement;
    if (!target.classList.contains('cell')) return;

    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);

    field[y][x] = field[y][x] === 1 ? 0 : 1;
    renderField(field, container);
  });

  // Скорость игры
  let speed = 500;

  function changeSpeed(newSpeed: number) {
    speed = 1100 - newSpeed * 100;
    if (intervalId !== null) {
      stopGame();
      startGame();
    }
  }

  function setupSpeedControl(): void {
    const speedInput = document.querySelector('.speed') as HTMLInputElement;
    if (!speedInput) throw new Error('Speed input not found');
    changeSpeed(Number(speedInput.value));

    speedInput.addEventListener('input', () => {
      changeSpeed(Number(speedInput.value));
    });
  }

  setupSpeedControl();

  // Кнопка Шаг
  function step(): void {
    field = getNextGeneration(field);
    renderField(field, container);
  }
  stepBtn.addEventListener('click', step);

  // Кнопка Старт
  function startGame(): void {
    if (intervalId === null) {
      intervalId = window.setInterval(() => {
        field = getNextGeneration(field);
        renderField(field, container);
      }, speed);
    }
  }
  startBtn.addEventListener('click', startGame);

  // Кнопка Стоп
  function stopGame(): void {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  stopBtn.addEventListener('click', stopGame);

  // Изменение размера поля
  const widthInput = document.querySelector('.width-input') as HTMLInputElement;
  const heightInput = document.querySelector(
    '.height-input',
  ) as HTMLInputElement;
  const resizeBtn = document.querySelector('.size-btn') as HTMLButtonElement;

  function resizeField(): void {
    const newWidth = Number(widthInput.value);
    const newHeight = Number(heightInput.value);

    stopGame();
    field = createEmptyField(newHeight, newWidth);
    renderField(field, container);
  }
  resizeBtn.addEventListener('click', resizeField);

  // Кнопка Рандомное поле
  function generateRandomField(): void {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    stopGame();
    field = createRandomField(height, width);
    renderField(field, container);
  }
  randomBtn.addEventListener('click', generateRandomField);

  // Кнопка Очистить поле
  function clearField(): void {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    stopGame();
    field = createEmptyField(height, width);
    renderField(field, container);
  }
  clearBtn.addEventListener('click', clearField);
}
