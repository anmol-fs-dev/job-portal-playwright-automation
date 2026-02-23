import { test, expect } from '@playwright/test';


//  UI signup for student
test('user should be able to signup successfully', async ({ page }) => {
    await page.goto('/signup');
    const uniqueEmail = `student_${Date.now()}@test.com`;
    await page.fill('input[name="fullname"]', 'John Doe');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'studentuser');
    await page.fill('input[name="phoneNumber"]', '9999999999');
    await page.locator(`input[value="student"]`).click();

    await page.click('button[type="submit"]');
    await page.goto('/browse');
    await expect(page).toHaveURL('/browse');

});


// User shouldnt be able to signup by incorrectly filling up the form
test('user should not be able to signup by incorrectly filling up the form', async ({ page }) => {
    await page.goto('/signup');
    const uniqueEmail = `student_${Date.now()}@test.com`;
    await page.fill('input[name="fullname"]', 'John Doe');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'studentuser');
    await page.locator(`input[value="student"]`).click();

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/signup');

});

