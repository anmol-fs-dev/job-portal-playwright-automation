/**
 * StudentJobsPage represents the main job browsing and filtering interface for students.
 */
export class StudentJobsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // FilterCard.jsx locators (using labels for radio buttons)
        // General approach: find the filter type then click the radio label
    }

    /**
     * Navigates to the Jobs browsing page.
     */
    async navigate() {
        await this.page.goto('/jobs');
    }

    /**
     * Filters jobs by a specific value (Location, Industry, or Salary).
     * @param {string} filterValue - The label of the filter to select (e.g., 'Delhi NCR', 'Frontend Developer').
     */
    async applyFilter(filterValue) {
        // Since FilterCard uses RadioGroup with Labels
        await this.page.getByText(filterValue, { exact: true }).click();
    }

    /**
     * Gets the number of job cards currently visible.
     * @returns {Promise<number>}
     */
    async getVisibleJobCount() {
        return await this.page.locator('div.grid div.motion-div').count();
    }

    /**
     * Clicks on the 'Details' button for a specific job.
     * @param {string} jobTitle - The title of the job to click.
     */
    async viewJobDetails(jobTitle) {
        const jobCard = this.page.locator('div.motion-div').filter({ hasText: jobTitle });
        await jobCard.getByRole('button', { name: 'Details' }).click();
    }
}
