import { test, expect } from '@playwright/test';
import { users } from '../../../test-data/users';

// User should be able to login using valid user credentials
test('user should be able to login successfully', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', users.recruiter.email);
    await page.fill('input[name="password"]', users.recruiter.password);
    await page.locator(`input[value="${users.recruiter.role}"]`).click();

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('admin/companies');

    const uniqueCompanyName = `Test Company Name ${Date.now()}`;
    await page.getByText('New Company').click();
    await expect(page.getByText('Your Comapny Name')).toBeVisible();
    await page.fill('input[placeholder="Jobhunt, Microsoft etc."]', uniqueCompanyName);
    await page.getByText('Continue').click();

    await expect(page.getByText('Company Setup')).toBeVisible();

    await page.fill('input[name="description"]', "This is a test company description");
    await page.fill('input[name="website"]', "https://www.google.com");
    await page.fill('input[name="location"]', "Random Location");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('admin/companies');
});


