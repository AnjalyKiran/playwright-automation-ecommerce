import { Page, expect } from '@playwright/test';

export async function expectAlertContains(
  page: Page,
  expected: string | RegExp
) {
  const alertByRole = page.getByRole('alert');

  if (await alertByRole.count()) {
    await expect(alertByRole.first()).toBeVisible();
    await expect(alertByRole.first()).toContainText(expected);
    return;
  }

  const alertFallback = page.locator(
    '.alert, .alert-error, .alert-danger, .warning, .error'
  );

  await expect(alertFallback.first()).toBeVisible();
  await expect(alertFallback.first()).toContainText(expected);
}
