/**
 * JobApplicantsPage represents the page where recruiters view and manage applicants for a specific job.
 */
export class JobApplicantsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Table caption to verify we are on the right page
        this.tableCaption = page.getByText('A list of your recent applied user');
    }

    /**
     * Clicks the action (ellipsis) button for a specific applicant in the table.
     * @param {string} applicantName - The full name of the applicant to target.
     */
    async clickActionForApplicant(applicantName) {
        const applicantRow = this.page.locator('tr').filter({ hasText: applicantName });
        // The ellipsis icon is inside a PopoverTrigger button
        await applicantRow.locator('button').first().click();
    }

    /**
     * Selects a status from the actions popover.
     * @param {string} status - The status to select (e.g., 'Accepted', 'Rejected').
     */
    async selectStatus(status) {
        // The status options are inside divs with cursor-pointer
        await this.page.getByText(status, { exact: true }).click();
    }

    /**
     * Verifies that the status update success message is displayed.
     */
    async verifyStatusUpdateSuccess() {
        // The app uses sonner for toasts, usually matching text works well
        const successMessage = this.page.getByText('Status updated successfully');
        await successMessage.waitFor({ state: 'visible' });
    }
}
