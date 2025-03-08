import '@testing-library/jest-dom';
import 'src/inversify.config';
import { appContainer } from 'src/modules/global/appContainer';

beforeEach(() => {
  appContainer.snapshot();
});

afterEach(async () => {
  appContainer.restore();
});
