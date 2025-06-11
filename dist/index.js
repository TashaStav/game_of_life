import { createEmptyField } from './gameField.js';
import { createRandomField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration } from './game.js';
let field = createEmptyField(25, 25);
const container = document.querySelector('.field');
const stepBtn = document.querySelector('.step-btn');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const randomBtn = document.querySelector('.random-btn');
const clearBtn = document.querySelector('.clear-btn');
renderField(field, container);
container.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('cell'))
        return;
    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);
    field[y][x] = field[y][x] === 1 ? 0 : 1;
    renderField(field, container);
});
let speed = 500;
let intervalId = null;
function changeSpeed(newSpeed) {
    speed = 1100 - newSpeed * 100;
    if (intervalId !== null) {
        stopGame();
        startGame();
    }
}
function setupSpeedControl() {
    const speedInput = document.querySelector('.speed');
    changeSpeed(Number(speedInput.value));
    speedInput.addEventListener('input', () => {
        changeSpeed(Number(speedInput.value));
    });
}
setupSpeedControl();
function step() {
    field = getNextGeneration(field);
    renderField(field, container);
}
stepBtn.addEventListener('click', step);
function startGame() {
    if (intervalId === null) {
        intervalId = window.setInterval(() => {
            field = getNextGeneration(field);
            renderField(field, container);
        }, speed);
    }
}
startBtn.addEventListener('click', startGame);
function stopGame() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
stopBtn.addEventListener('click', stopGame);
const widthInput = document.querySelector('.width-input');
const heightInput = document.querySelector('.height-input');
const resizeBtn = document.querySelector('.size-btn');
function resizeField() {
    const newWidth = Number(widthInput.value);
    const newHeight = Number(heightInput.value);
    stopGame();
    field = createEmptyField(newHeight, newWidth);
    renderField(field, container);
}
resizeBtn.addEventListener('click', resizeField);
function generateRandomField() {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    stopGame();
    field = createRandomField(height, width);
    renderField(field, container);
}
randomBtn.addEventListener('click', generateRandomField);
function clearField() {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    stopGame();
    field = createEmptyField(height, width);
    renderField(field, container);
}
clearBtn.addEventListener('click', clearField);
//# sourceMappingURL=index.js.map