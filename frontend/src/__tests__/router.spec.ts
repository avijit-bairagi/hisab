import { describe, it, expect, beforeAll } from 'vitest';
import { routes, router } from '../router';

describe('Router Configuration', () => {
  beforeAll(() => {
    window.scrollTo = () => {};
  });

  it('defines all required application routes', () => {
    const paths = routes.map((r) => r.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/tools/calculator');
    expect(paths).toContain('/tools/dps-calculator');
    expect(paths).toContain('/tools/tax-calculator');
    expect(paths).toContain('/:pathMatch(.*)*');
  });

  it('navigates to the calculator route', async () => {
    await router.push('/tools/calculator');
    await router.isReady();
    expect(router.currentRoute.value.path).toBe('/tools/calculator');
  });

  it('navigates to the dps route', async () => {
    await router.push('/tools/dps-calculator');
    await router.isReady();
    expect(router.currentRoute.value.path).toBe('/tools/dps-calculator');
  });

  it('navigates to the tax route', async () => {
    await router.push('/tools/tax-calculator');
    await router.isReady();
    expect(router.currentRoute.value.path).toBe('/tools/tax-calculator');
  });
});
