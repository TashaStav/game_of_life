import { createEmptyField } from './gameField.js';
import { renderField } from './gameView.js';
import { getNextGeneration } from './game.js';
let field = createEmptyField(30, 30);
const container = document.querySelector('.field');
const stepBtn = document.querySelector('.step-btn');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
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
let intervalId = null;
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
        }, 500);
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
//# sourceMappingURL=index.js.map