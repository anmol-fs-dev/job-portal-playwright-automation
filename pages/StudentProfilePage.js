/**
 * StudentProfilePage represents the student's personal profile and application history.
 */
export class StudentProfilePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators in Profile.jsx
        this.editProfileButton = page.locator('button').filter({ has: page.locator('svg') }).first();
        this.appliedJobsTitle = page.getByText('Applied Job', { exact: true });

        // Update Profile Dialog locators (UpdateProfileDialog.jsx)
        this.nameInput = page.getByPlaceholder('Write your full name');
        this.emailInput = page.getByPlaceholder('Write your email address');
        this.numberInput = page.getByPlaceholder('Write your phone number');
        this.bioInput = page.getByPlaceholder('Write about yourself');
        this.skillsInput = page.getByPlaceholder('Seprated with comma');
        this.resumeInput = page.locator('input[type="file"]');
        this.updateButton = page.getByRole('button', { name: 'Update', exact: true });
    }

    /**
     * Navigates to the profile page.
     */
    async navigate() {
        await this.page.goto('/profile');
    }

    /**
     * Clicks the edit button to open the Update Profile dialog.
     */
    async clickEditProfile() {
        // Find the button that contains an SVG (the Pen icon)
        // Using force: true in case framer-motion is considered to be "moving" or "blocked"
        await this.editProfileButton.click({ force: true });
    }

    /**
     * Updates the profile details.
     * @param {Object} details - Object containing profile information.
     */
    async updateProfile(details) {
        if (details.fullname) await this.nameInput.fill(details.fullname);
        if (details.email) await this.emailInput.fill(details.email);
        if (details.phoneNumber) await this.numberInput.fill(details.phoneNumber);
        if (details.bio) await this.bioInput.fill(details.bio);
        if (details.skills) await this.skillsInput.fill(details.skills);

        if (details.resumePath) {
            await this.resumeInput.setInputFiles(details.resumePath);
        }

        await this.updateButton.click();
    }

    /**
     * Gets the status of a specific job from the Applied Jobs table.
     * @param {string} jobTitle - The title of the job to check.
     * @returns {Promise<string>} - The status of the application (e.g., 'PENDING', 'ACCEPTED', 'REJECTED').
     */
    async getJobStatus(jobTitle) {
        const row = this.page.locator('tr').filter({ hasText: jobTitle });
        return await row.locator('[data-slot="badge"]').textContent();
    }

    /**
     * Verifies that the profile updated successfully.
     */
    async verifyUpdateSuccess() {
        await this.page.getByText('Profile updated successfully').waitFor({ state: 'visible' });
    }
}
