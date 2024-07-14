import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, vitest } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vitest.clearAllMocks();
});

expect.extend(matchers);
