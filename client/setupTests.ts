import '@testing-library/jest-dom';
import { appContainer } from 'src/modules/global/appContainer';

beforeEach(() => {
  appContainer.snapshot();
});

afterEach(async () => {
  appContainer.restore();
});
