import { test, expect } from '@playwright/test';

test('should land on jobs page after login', async ({ page }) => {

    await page.goto('/browse');

    await expect(page).toHaveURL(/browse/);
});
