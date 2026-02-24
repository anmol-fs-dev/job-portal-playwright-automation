/**
 * CompanySetupPage is the second/final step where detailed company info is provided.
 */
export class CompanySetupPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators for the detailed fields
        this.descriptionInput = page.locator('input[name="description"]');
        this.websiteInput = page.locator('input[name="website"]');
        this.locationInput = page.locator('input[name="location"]');

        // Submit button for the entire form
        this.submitButton = page.locator('button[type="submit"]');
    }

    /**
     * Fills out the company setup form.
     * @param {Object} details - Object containing description, website, and location.
     */
    async setupCompany(details) {
        // Fill fields if the data is provided in the object
        if (details.description) await this.descriptionInput.fill(details.description);
        if (details.website) await this.websiteInput.fill(details.website);
        if (details.location) await this.locationInput.fill(details.location);

        // Final submission
        await this.submitButton.click();
    }
}
