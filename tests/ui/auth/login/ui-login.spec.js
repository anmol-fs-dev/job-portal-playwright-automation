import { test, expect } from '@playwright/test';
import { users } from '../../../../test-data/users';

// Valid login → 200
test('Login should return 200', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', users.student.email);
    await page.fill('input[name="password"]', users.student.password);
    await page.locator(`input[value="${users.student.role}"]`).click();

    await page.click('button[type="submit"]');
    console.log(users, "testasjdnkajsdnkjasd");
    await expect(page).toHaveURL('/');

});

