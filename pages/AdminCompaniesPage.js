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
    }

    /**
     * Clicks the "New Company" button to start the creation flow.
     */
    async clickNewCompany() {
        await this.newCompanyButton.click();
    }
}
