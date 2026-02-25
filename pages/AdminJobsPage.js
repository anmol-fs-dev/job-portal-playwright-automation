/**
 * AdminJobsPage represents the dashboard where recruiters manage and view their job listings.
 */
export class AdminJobsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter input for job searches
        this.filterInput = page.getByPlaceholder('Filter by name, role');

        // Button to navigate to the Post Job creation page
        this.postNewJobButton = page.getByRole('button', { name: 'Post New Jobs' });
    }

    /**
     * Clicks the button to navigate to the Job Creation form.
     */
    async clickPostNewJob() {
        await this.postNewJobButton.click();
    }

    /**
     * Filters the jobs list by a given search term.
     * @param {string} term - The search term (name or role).
     */
    async filterJobs(term) {
        await this.filterInput.fill(term);
    }

    /**
     * Clicks the action (ellipsis) button for a specific job in the table.
     * @param {string} title - The title of the job to target.
     */
    async clickActionForJob(title) {
        const jobRow = this.page.locator('tr').filter({ hasText: title });
        await jobRow.locator('button').first().click();
    }

    /**
     * Clicks the "Applicants" option in the actions popover.
     */
    async clickViewApplicants() {
        await this.page.getByText('Applicants').click();
    }
}
