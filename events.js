import { createEmptyField, createRandomField } from './gameField';
import { renderField } from './gameView';
import { getNextGeneration, areFieldEqual } from './game';
export let intervalId = null;
export function init() {
    let field = createEmptyField(25, 25);
    const container = document.querySelector('.field');
    const stepBtn = document.querySelector('.step-btn');
    const startBtn = document.querySelector('.start-btn');
    const stopBtn = document.querySelector('.stop-btn');
    const randomBtn = document.querySelector('.random-btn');
    const clearBtn = document.querySelector('.clear-btn');
    renderField(field, container);
    function isFieldEmpty(field) {
        return field.every((row) => row.every((cell) => cell === 0));
    }
    // Ручное изменение состояния клеток
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('cell'))
            return;
        const x = Number(target.dataset.x);
        const y = Number(target.dataset.y);
        field[y][x] = field[y][x] === 1 ? 0 : 1;
        renderField(field, container);
    });
    // Скорость игры
    let speed = 500;
    function changeSpeed(newSpeed) {
        speed = 1100 - newSpeed * 100;
        if (intervalId !== null) {
            stopGame();
            startGame();
        }
    }
    function setupSpeedControl() {
        const speedInput = document.querySelector('.speed');
        if (!speedInput)
            throw new Error('Speed input not found');
        changeSpeed(Number(speedInput.value));
        speedInput.addEventListener('input', () => {
            changeSpeed(Number(speedInput.value));
        });
    }
    setupSpeedControl();
    // История игры
    const fieldHistory = new Set();
    function clearHistory() {
        fieldHistory.clear();
    }
    // Кнопка Шаг
    function step() {
        const nextField = getNextGeneration(field);
        const fieldState = JSON.stringify(nextField);
        if (isFieldEmpty(nextField) ||
            areFieldEqual(field, nextField) ||
            fieldHistory.has(fieldState)) {
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
    function startGame() {
        if (intervalId === null) {
            intervalId = window.setInterval(() => {
                const nextField = getNextGeneration(field);
                const fieldState = JSON.stringify(nextField);
                if (isFieldEmpty(nextField) ||
                    areFieldEqual(field, nextField) ||
                    fieldHistory.has(fieldState)) {
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
    function stopGame() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    stopBtn.addEventListener('click', stopGame);
    // Изменение размера поля
    const widthInput = document.querySelector('.width-input');
    const heightInput = document.querySelector('.height-input');
    const resizeBtn = document.querySelector('.size-btn');
    function resizeField() {
        const newWidth = Number(widthInput.value);
        const newHeight = Number(heightInput.value);
        stopGame();
        field = createEmptyField(newHeight, newWidth);
        clearHistory();
        renderField(field, container);
    }
    resizeBtn.addEventListener('click', resizeField);
    // Кнопка Рандомное поле
    function generateRandomField() {
        const width = Number(widthInput.value);
        const height = Number(heightInput.value);
        stopGame();
        field = createRandomField(height, width);
        clearHistory();
        renderField(field, container);
    }
    randomBtn.addEventListener('click', generateRandomField);
    // Кнопка Очистить поле
    function clearField() {
        const width = Number(widthInput.value);
        const height = Number(heightInput.value);
        stopGame();
        field = createEmptyField(height, width);
        clearHistory();
        renderField(field, container);
    }
    clearBtn.addEventListener('click', clearField);
}
//# sourceMappingURL=events.js.map