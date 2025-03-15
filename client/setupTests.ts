import '@testing-library/jest-dom';
import 'src/core/global/inversify.config';
import { appContainer } from 'src/core/global/appContainer';

beforeEach(() => {
  appContainer.snapshot();
});

afterEach(async () => {
  appContainer.restore();
});
