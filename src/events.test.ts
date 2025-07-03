import { init } from './events';
import { createEmptyField, createRandomField } from './gameField';
import { renderField } from './gameView';
import { getNextGeneration } from './game';

jest.mock('./gameField', () => ({
  createEmptyField: jest.fn(() =>
    Array(25)
      .fill(null)
      .map(() => Array(25).fill(0)),
  ),
  createRandomField: jest.fn(() =>
    Array(25)
      .fill(null)
      .map(() => Array(25).fill(1)),
  ),
}));

jest.mock('./gameView', () => ({
  renderField: jest.fn(),
}));

jest.mock('./game', () => ({
  getNextGeneration: jest.fn(() =>
    Array(25)
      .fill(null)
      .map(() => Array(25).fill(1)),
  ),
  areFieldEqual: jest.fn(() => false),
}));

describe('init()', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="field"></div>
      <button class="step-btn"></button>
      <button class="start-btn"></button>
      <button class="stop-btn"></button>
      <button class="random-btn"></button>
      <button class="clear-btn"></button>
      <button class="size-btn"></button>
      <input class="width-input" value="25"/>
      <input class="height-input" value="25"/>
      <input class="speed" value="5"/>
      // <div class="modal-wrp" style="display: none;">
      //     <p class="modal-message"></p>
      //     <button class="modal-close-btn">OK</button>
      //   </div>
    `;

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should draw the field on initialization', () => {
    init();
    expect(renderField).toHaveBeenCalled();
  });

  it('should call getNextGeneration and renderField on click on step', () => {
    init();
    const stepBtn = document.querySelector('.step-btn') as HTMLButtonElement;
    stepBtn.click();

    expect(getNextGeneration).toHaveBeenCalled();
    expect(renderField).toHaveBeenCalled();
  });

  it('should call createRandomField and renderField on click on random-btn', () => {
    init();
    const randomBtn = document.querySelector(
      '.random-btn',
    ) as HTMLButtonElement;
    randomBtn.click();

    expect(createRandomField).toHaveBeenCalledWith(25, 25);
    expect(renderField).toHaveBeenCalled();
  });

  it('should call createEmptyField and renderField on click on clear-btn', () => {
    init();
    const clearBtn = document.querySelector('.clear-btn') as HTMLButtonElement;
    clearBtn.click();

    expect(createEmptyField).toHaveBeenCalledWith(25, 25);
    expect(renderField).toHaveBeenCalled();
  });

  it('should update the field with the new size on click on size-btn', () => {
    const widthInput = document.querySelector(
      '.width-input',
    ) as HTMLInputElement;
    const heightInput = document.querySelector(
      '.height-input',
    ) as HTMLInputElement;
    widthInput.value = '10';
    heightInput.value = '15';

    init();
    const sizeBtn = document.querySelector('.size-btn') as HTMLButtonElement;
    sizeBtn.click();

    expect(createEmptyField).toHaveBeenCalledWith(15, 10);
    expect(renderField).toHaveBeenCalled();
  });

  it('should launch the game at intervals on click on start', () => {
    init();
    const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
    startBtn.click();

    jest.advanceTimersByTime(600);
    expect(getNextGeneration).toHaveBeenCalled();
    expect(renderField).toHaveBeenCalled();
  });

  it('should clear timer on click on stop', () => {
    init();
    const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
    const stopBtn = document.querySelector('.stop-btn') as HTMLButtonElement;

    startBtn.click();
    jest.advanceTimersByTime(600);
    stopBtn.click();
    jest.advanceTimersByTime(1000);

    expect(getNextGeneration).toHaveBeenCalledTimes(1);
  });
});
