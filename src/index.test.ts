import { runApp } from './index';
import { init } from './events';

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
