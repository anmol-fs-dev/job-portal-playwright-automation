import { test, expect } from '@playwright/test';
import { users } from '../../../../test-data/users';
import { LoginPage } from '../../../../pages/LoginPage';
import { Navbar } from '../../../../pages/Navbar';

/**
 * UI Login tests for different user types.
 * These tests verify successful login, failed login, and logout.
 */

// Positive test case: User should be able to login using valid credentials
test('user should be able to login successfully', async ({ page }) => {
    // 1. Initialize the Page Object for the login page
    const loginPage = new LoginPage(page);

    // 2. Navigate to the login page
    await loginPage.navigate();

    // 3. Perform login using test data from users.js
    await loginPage.login(users.student.email, users.student.password, users.student.role);

    // 4. Assert that the navigation to the dashboard ('/') was successful
    await expect(page).toHaveURL('/');
});

// Negative test case: User should NOT be able to login using invalid user credentials
test('user should not be able to login using invalid user credentials', async ({ page }) => {
    // 1. Initialize the Login Page Object
    const loginPage = new LoginPage(page);

    // 2. Navigate to /login
    await loginPage.navigate();

    // 3. Attempt login with valid email/password but NO role selected (intentional failure logic)
    // Note: Passing 'null' to role will skip the role selection click in LoginPage.login()
    await loginPage.login(users.student.email, users.student.password, null);

    // 4. Assert that the URL stays on the /login page (login failed)
    await expect(page).toHaveURL("/login");
});

// Session invalidation test: Verify that logout works correctly
test('logout should invalidate the session', async ({ page }) => {
    // 1. Initialize required Page Objects (Login and Navbar)
    const loginPage = new LoginPage(page);
    const navbar = new Navbar(page);

    // 2. Perform a successful login first
    await loginPage.navigate();
    await loginPage.login(users.student.email, users.student.password, users.student.role);
    await expect(page).toHaveURL('/');

    // 3. Perform the logout action via the Navbar Page Object
    await navbar.logout();

    // 4. Assert that a success message is visible
    await expect(page.getByText('Logged out successfully')).toBeVisible();

    // 5. Verify session invalidation by attempting to go back to the dashboard/login
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
});
