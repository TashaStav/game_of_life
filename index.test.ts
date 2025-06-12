import { runApp } from './index.js';
import { init } from './events.js';

jest.mock('./events', () => ({
  init: jest.fn(),
}));
describe('runApp', () => {
  test('runApp call init', () => {
    runApp();
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(init).toHaveBeenCalled();
  });
});
