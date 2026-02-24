/**
 * SignupPage class encapsulates the user registration flow.
 */
export class SignupPage {
    /**
     * @param {import('@playwright/test').Page} page - Playwright Page object.
     */
    constructor(page) {
        this.page = page;

        // Locators for the various input fields on the signup form
        this.fullNameInput = page.locator('input[name="fullname"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.phoneNumberInput = page.locator('input[name="phoneNumber"]');
        this.submitButton = page.locator('button[type="submit"]');
    }

    /**
     * Navigates to the signup page.
     */
    async navigate() {
        await this.page.goto('/signup');
    }

    /**
     * Fills out the signup form and submits it.
     * Takes an object as input to handle optional fields or different user setups.
     * @param {Object} user - An object containing user details.
     */
    async signup(user) {
        // Check if the property exists before filling, allowing for partial form fills
        if (user.fullname) await this.fullNameInput.fill(user.fullname);
        if (user.email) await this.emailInput.fill(user.email);
        if (user.password) await this.passwordInput.fill(user.password);
        if (user.phoneNumber) await this.phoneNumberInput.fill(user.phoneNumber);

        // Select the role (e.g., Student or Recruiter)
        if (user.role) {
            await this.page.locator(`input[value="${user.role}"]`).click();
        }

        // Submit the form
        await this.submitButton.click();
    }
}
