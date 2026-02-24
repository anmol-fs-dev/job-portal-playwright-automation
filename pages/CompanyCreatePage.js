/**
 * CompanyCreatePage is the first step in adding a new company (entering the name).
 */
export class CompanyCreatePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locator for the name input field, using the placeholder text
        this.companyNameInput = page.locator('input[placeholder="Jobhunt, Microsoft etc."]');

        // Continue button to move to the next step
        this.continueButton = page.getByText('Continue');
    }

    /**
     * Types the company name into the field.
     * @param {string} name - The name of the company to create.
     */
    async enterCompanyName(name) {
        await this.companyNameInput.fill(name);
    }

    /**
     * Submits the first step.
     */
    async clickContinue() {
        await this.continueButton.click();
    }
}
