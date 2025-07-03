import { init } from './events';

export function runApp() {
  document.addEventListener('DOMContentLoaded', () => {
    init();
  });
}
runApp();
