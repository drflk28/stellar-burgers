import '@testing-library/jest-dom';
import type * as jestGlobal from '@jest/globals';

declare global {
  const jest: typeof jestGlobal.jest;
  const describe: typeof jestGlobal.describe;
  const it: typeof jestGlobal.it;
  const expect: typeof jestGlobal.expect;
  const beforeEach: typeof jestGlobal.beforeEach;
  const afterEach: typeof jestGlobal.afterEach;
  const beforeAll: typeof jestGlobal.beforeAll;
  const afterAll: typeof jestGlobal.afterAll;
}
