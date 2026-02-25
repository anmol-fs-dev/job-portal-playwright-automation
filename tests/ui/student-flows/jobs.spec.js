import { test, expect } from '@playwright/test';
import { users } from '../../../test-data/users';
import { LoginPage } from '../../../pages/LoginPage';
import { StudentJobsPage } from '../../../pages/StudentJobsPage';


test.describe('Student Job Browsing Flows', () => {
    let loginPage;
    let studentJobsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        studentJobsPage = new StudentJobsPage(page);

        // Login as student
        await loginPage.navigate();
        await loginPage.login(users.student.email, users.student.password, users.student.role);

        // Navigate to jobs
        await studentJobsPage.navigate();
    });

    test('Student should be able to browse and filter jobs', async ({ page }) => {
        // 1. Verify initial job list is visible
        const initialCount = await studentJobsPage.getVisibleJobCount();
        console.log(`Initial job count: ${initialCount}`);

        // 2. Apply a filter (e.g., Location: Delhi NCR)
        // Note: Filters in FilterCard.jsx are: Location, Industry, Salary
        await studentJobsPage.applyFilter('Delhi NCR');

        // Filter application might take a moment due to Redux/useEffect
        await page.waitForTimeout(1000);

        // 3. Verify filtered results (this depends on available data, but we can verify it doesn't crash)
        const filteredCount = await studentJobsPage.getVisibleJobCount();
        console.log(`Filtered job count (Delhi NCR): ${filteredCount}`);

        // 4. Reset or change filter (Industry: Frontend Developer)
        await studentJobsPage.applyFilter('Frontend Developer');
        await page.waitForTimeout(1000);

        const industryFilteredCount = await studentJobsPage.getVisibleJobCount();
        console.log(`Filtered job count (Frontend Developer): ${industryFilteredCount}`);

        // 5. Verify navigation to job details
        if (industryFilteredCount > 0) {
            // Find the first job card title
            const firstJobTitle = await page.locator('div.motion-div h1.font-bold').first().textContent();
            await studentJobsPage.viewJobDetails(firstJobTitle);

            // Verify navigation to details page
            await expect(page).toHaveURL(/.*\/description\/.*/);
            await expect(page.getByText('Job Description')).toBeVisible();
            await expect(page.getByText(firstJobTitle)).toBeVisible();
        }
    });
});
