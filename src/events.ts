import { createEmptyField, createRandomField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration, areFieldEqual } from './game.js';

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

  function isFieldEmpty(field: number[][]): boolean {
    return field.every((row) => row.every((cell) => cell === 0));
  }

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
  // История игры
  const fieldHistory = new Set<string>();
  function clearHistory(): void {
    fieldHistory.clear();
  }

  // Кнопка Шаг
  function step(): void {
    const nextField = getNextGeneration(field);
    const fieldState = JSON.stringify(nextField);

    if (
      isFieldEmpty(nextField) ||
      areFieldEqual(field, nextField) ||
      fieldHistory.has(fieldState)
    ) {
      stopGame();
      alert('Игра окончена');
      return;
    }

    field = nextField;
    fieldHistory.add(fieldState);
    renderField(field, container);
  }
  stepBtn.addEventListener('click', step);

  // Кнопка Старт
  function startGame(): void {
    if (intervalId === null) {
      intervalId = window.setInterval(() => {
        const nextField = getNextGeneration(field);
        const fieldState = JSON.stringify(nextField);
        if (
          isFieldEmpty(nextField) ||
          areFieldEqual(field, nextField) ||
          fieldHistory.has(fieldState)
        ) {
          stopGame();
          alert('Игра окончена');
          return;
        }

        field = nextField;
        fieldHistory.add(fieldState);
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
    clearHistory();
    renderField(field, container);
  }
  resizeBtn.addEventListener('click', resizeField);

  // Кнопка Рандомное поле
  function generateRandomField(): void {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    stopGame();
    field = createRandomField(height, width);
    clearHistory();
    renderField(field, container);
  }
  randomBtn.addEventListener('click', generateRandomField);

  // Кнопка Очистить поле
  function clearField(): void {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);

    stopGame();
    field = createEmptyField(height, width);
    clearHistory();
    renderField(field, container);
  }
  clearBtn.addEventListener('click', clearField);
}
