/**
 * Navbar component handles global UI elements that appear on multiple pages.
 */
export class Navbar {
    /**
     * @param {import('@playwright/test').Page} page - Playwright Page object.
     */
    constructor(page) {
        this.page = page;

        // The profile image acting as an avatar/dropdown trigger
        this.profileTrigger = page.locator('img[alt="profile"]');

        // Final logout button found by its exact text
        this.logoutButton = page.getByText('Logout');
    }

    /**
     * Performs the logout flow by opening the profile menu and clicking Logout.
     */
    async logout() {
        // Open the dropdown menu first
        await this.profileTrigger.click();

        // Click the logout button inside the menu
        await this.logoutButton.click();
    }
}
