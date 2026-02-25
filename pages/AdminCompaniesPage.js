/**
 * AdminCompaniesPage is the dashboard where recruiters see their list of companies.
 */
export class AdminCompaniesPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Button to start creating a new company
        this.newCompanyButton = page.getByText('New Company');

        // Input field to filter companies by name
        this.filterInput = page.locator('input[placeholder="Filter by name"]');

        // Link/Button to navigate to the Jobs section in the navbar
        this.jobsLink = page.locator('a[href="/admin/jobs"]');
    }

    /**
     * Clicks the "New Company" button to start the creation flow.
     */
    async clickNewCompany() {
        await this.newCompanyButton.click();
    }

    /**
     * Fills the filter input to search for a specific company.
     * @param {string} name - The name of the company to search for.
     */
    async filterCompanies(name) {
        await this.filterInput.fill(name);
    }

    /**
     * Clicks the action (ellipsis) button for a specific company in the table.
     * @param {string} name - The name of the company to target.
     */
    async clickActionForCompany(name) {
        const companyRow = this.page.locator('tr').filter({ hasText: name });
        await companyRow.locator('button').click();
    }

    /**
     * Clicks the "Edit" button. This is usually called after clickActionForCompany.
     */
    async clickEdit() {
        await this.page.getByText('Edit').click();
    }

    /**
     * Navigates to the Jobs management page.
     */
    async clickJobs() {
        await this.jobsLink.click();
    }
}
