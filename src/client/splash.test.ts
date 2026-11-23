import { afterEach, describe, expect, it, vi } from 'vitest';

let requestExpandedModeMock: ReturnType<typeof vi.fn>;
let navigateToMock: ReturnType<typeof vi.fn>;

vi.mock('@devvit/web/client', () => {
  requestExpandedModeMock = vi.fn();
  navigateToMock = vi.fn();

  return {
    navigateTo: navigateToMock,
    context: {
      username: 'test-user',
    },
    requestExpandedMode: requestExpandedModeMock,
  };
});

afterEach(() => {
  requestExpandedModeMock?.mockReset();
  navigateToMock?.mockReset();
});

describe('Splash', () => {
  it('clicking "Begin Investigation" calls requestExpandedMode(...)', async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import('./splash');

    await new Promise((r) => setTimeout(r, 0));

    const startButton = Array.from(document.querySelectorAll('button')).find(
      (b) => /begin investigation/i.test(b.textContent ?? '')
    );
    expect(startButton).toBeTruthy();

    startButton!.click();

    expect(requestExpandedModeMock).toHaveBeenCalledTimes(1);
    expect(requestExpandedModeMock).toHaveBeenCalledWith(
      expect.anything(),
      'game'
    );
  });
});
