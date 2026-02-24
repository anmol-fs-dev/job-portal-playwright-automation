/**
 * LoginPage class encapsulates all interactions with the Login page.
 * This includes finding elements (locators) and performing actions like logging in.
 */
export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page - The Playwright Page object.
     */
    constructor(page) {
        // Store the page instance for use in methods
        this.page = page;

        // Locators represent 'how' to find elements on the page.
        // If the UI changes (e.g., name attribute changes), we only update here.
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[type="submit"]');
    }

    /**
     * Navigates to the login page URL.
     */
    async navigate() {
        // Uses the baseURL defined in playwright.config.js
        await this.page.goto('/login');
    }

    /**
     * Performs a complete login flow.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @param {string} role - The role to select (e.g., 'student' or 'recruiter').
     */
    async login(email, password, role) {
        // Fill the email and password fields
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        // Select the role radio button if provided
        // We use backticks and ${} to insert the role variable into the selector
        if (role) {
            await this.page.locator(`input[value="${role}"]`).click();
        }

        // Click the final submit button to trigger login
        await this.submitButton.click();
    }
}
