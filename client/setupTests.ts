import '@testing-library/jest-dom';
import 'src/core/global/inversify.config';
import { appContainer } from 'src/core/global/appContainer';
import { vi } from 'vitest';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollTo = vi.fn().mockReturnValue({ x: 0, y: 0 });

beforeEach(() => {
  appContainer.snapshot();
});

afterEach(async () => {
  appContainer.restore();
});
