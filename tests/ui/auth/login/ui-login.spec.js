import { test, expect } from '@playwright/test';
import { users } from '../../../../test-data/users';

// User should be able to login using valid user credentials
test('user should be able to login successfully', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', users.student.email);
    await page.fill('input[name="password"]', users.student.password);
    await page.locator(`input[value="${users.student.role}"]`).click();

    await page.click('button[type="submit"]');
    console.log(users, "testasjdnkajsdnkjasd");
    await expect(page).toHaveURL('/');

});

// User shouldnt be able to login using invalid user credentials
test('user should not be able to login using invalid user credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', users.student.email);
    await page.fill('input[name="password"]', users.student.password);
    // await page.locator(`input[value="${users.student.role}"]`).click();

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/login");

});


// logout should invalidate the session


test('logout should invalidate the session', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', users.student.email);
    await page.fill('input[name="password"]', users.student.password);
    await page.locator(`input[value="${users.student.role}"]`).click();

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    await page.locator('img[alt="profile"]').click();
    await page.getByText("Logout").click();
    await expect(page.getByText('Logged out successfully')).toBeVisible();
    await page.goto('/login');
    await expect(page).toHaveURL('/login');

});

