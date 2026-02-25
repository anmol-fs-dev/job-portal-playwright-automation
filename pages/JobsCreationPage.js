/**
 * JobsCreationPage represents the specific page used for creating a new job posting.
 */
export class JobsCreationPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Form field locators (matching placeholders in UI)
        this.titleField = page.getByPlaceholder('Write job title');
        this.locationField = page.getByPlaceholder('Job Loaction'); // Misspelled as 'Loaction' in UI
        this.descriptionField = page.getByPlaceholder('Write job Description');
        this.requiredSkillsField = page.getByPlaceholder('Seprated with Comma'); // Misspelled as 'Seprated' in UI
        this.salaryField = page.getByPlaceholder('Write in LPA');
        this.jobTypeField = page.getByPlaceholder('Full Time or Part Time');
        this.experienceField = page.getByPlaceholder('Experience required');
        this.numberOfOpeningsField = page.getByPlaceholder('Write no. of opening');

        // Select trigger for company
        this.companySelectTrigger = page.getByLabel('Select a Company').or(page.locator('button:has-text("Select a Company")'));

        // Submit button
        this.submitButton = page.getByRole('button', { name: 'Post New Job', exact: true });
    }

    /**
     * Fills out the job posting form and submits it.
     * @param {Object} details - Object containing job details.
     * @param {string} [details.company] - Name of the company to select.
     */
    async postJob(details) {
        if (details.title) await this.titleField.fill(details.title);
        if (details.location) await this.locationField.fill(details.location);
        if (details.description) await this.descriptionField.fill(details.description);
        if (details.skills) await this.requiredSkillsField.fill(details.skills);
        if (details.salary) await this.salaryField.fill(String(details.salary));
        if (details.jobType) await this.jobTypeField.fill(details.jobType);
        if (details.experience) await this.experienceField.fill(String(details.experience));
        if (details.openings) await this.numberOfOpeningsField.fill(String(details.openings));

        if (details.company) {
            await this.companySelectTrigger.click();
            await this.page.getByRole('option', { name: details.company }).click();
        }

        await this.submitButton.click();
    }
}
